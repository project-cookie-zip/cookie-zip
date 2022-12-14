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
  if (req.method === "GET") {
    const video = await client.video.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        comments: {
          select: {
            content: true,
            id: true,
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });

    const isLike = Boolean(
      await client.like.findFirst({
        where: {
          videoId: Number(id),
          userId: user?.id,
        },
        select: {
          id: true,
        },
      }),
    );

    const isSubscribe = Boolean(
      await client.subscribe.findFirst({
        where: { createdById: user?.id, createdForId: video?.user?.id },
        select: {
          id: true,
        },
      }),
    );

    await client.video.update({
      where: {
        id: Number(video?.id),
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    // subscribe 나중에 추가
    res.json({
      ok: true,
      video,
      isLike,
      isSubscribe,
    });
  }
  if (req.method === "DELETE") {
    const {
      session: { user },
      query: { id },
    } = req;
    console.log(id);
    const targetVideo = await client.video.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (targetVideo?.userId === user?.id) {
      await client.video.delete({
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
        error: "VideoId / UserId Incorrespond",
      });
    }
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "DELETE"],
    handler,
  }),
);
