import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../utils/server/client";
import withHandler, { ResponseType } from "../../../utils/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { email, password, nickname } = req.body;

  const exist = Boolean(
    await client.user.findUnique({
      where: {
        email,
      },
    }),
  );

  if (!exist) {
    await client.user.create({
      data: {
        email,
        password,
        name: nickname,
      },
    });
    return res.json({
      ok: true,
    });
  } else {
    return res.status(409).json({ ok: false, message: "Email exist" });
  }
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
