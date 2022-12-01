import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@utils/server/withHandler";
import client from "@utils/server/client";
import { withApiSession } from "@utils/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  if (req.method === "GET") {
    const profile = await client.user.findUnique({
      where: { id: req.session.user?.id },
      select: {
        id: true,
        email: true,
        avatar: true,
        name: true,
      },
    });
    const subscribeList = await client.subscribe.findMany({
      where: {
        createdById: profile?.id,
      },
      select: {
        createdFor: {
          select: {
            id: true,
            email: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    res.json({
      ok: true,
      profile,
      subscribeList,
    });
  }
  if (req.method === "POST") {
    const {
      session: { user },
      body: { email, nickname, avatar },
    } = req;
    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });
    if (email && email !== currentUser?.email) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        }),
      );
      if (alreadyExists) {
        return res.json({
          ok: false,
          error: "Email already taken.",
        });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email,
        },
      });
      res.json({ ok: true });
    }
    if (nickname) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          name: nickname,
        },
      });
    }
    if (avatar) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          avatar,
        },
      });
    }
    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  }),
);
