import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@utils/server/withHandler";
import client from "@utils/server/client";
import { withApiSession } from "@utils/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const alreadyExists = await client.subscribe.findFirst({
    where: {
      createdById: Number(user?.id),
      createdForId: Number(id),
    },
  });
  if (alreadyExists) {
    await client.subscribe.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.subscribe.create({
      data: {
        createdBy: {
          connect: {
            id: Number(user?.id),
          },
        },
        createdFor: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
  }
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  }),
);
