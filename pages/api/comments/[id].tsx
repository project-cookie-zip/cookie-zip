import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@utils/server/withHandler";
import client from "@utils/server/client";
import { withApiSession } from "@utils/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  if (req.method === "DELETE") {
    const {
      session: { user },
      query: { id },
    } = req;
    const targetComment = await client.comment.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (targetComment?.userId === user?.id) {
      await client.comment.delete({
        where: {
          id: Number(id),
        },
      });
      res.json({
        ok: true,
      });
    } else {
      res.status(403).json({
        ok: false,
        error: "CommendId / UserId Incorrespond",
      });
    }
  }
}

export default withApiSession(
  withHandler({
    methods: ["DELETE"],
    handler,
    isPrivate: false,
  }),
);
