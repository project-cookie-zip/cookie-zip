import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../utils/server/client";
import withHandler, { ResponseType } from "../../../utils/server/withHandler";
import { withApiSession } from "../../../utils/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { email, password } = req.body;

  const findUser = await client.user.findUnique({
    where: {
      email,
    },
  });

  if (!findUser)
    return res.status(404).json({ ok: false, message: "Incorrect Email" });
  if (findUser && findUser.password === password) {
    req.session.user = {
      id: findUser?.id,
    };
    await req.session.save();
    return res.json({ ok: true });
  } else {
    return res.status(404).json({ ok: false, message: "Incorrect Password" });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false }),
);
