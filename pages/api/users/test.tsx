import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../utils/server/client";
import withHandler, { ResponseType } from "../../../utils/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const exist = await client.user.findUnique({
    where: {
      email: "hjs",
    },
  });

  return res.json({
    exist: exist,
    ok: true,
  });
}

export default withHandler({ methods: ["GET"], handler, isPrivate: false });
