import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@utils/server/withHandler";
import client from "@utils/server/client";
import { withApiSession } from "@utils/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  if (req.method === "GET") {
    const videos = await client.video.findMany({
      include: {
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      videos,
    });
  }
  if (req.method === "POST") {
    const {
      body: { title, description, videoUrl, thumbnailUrl, category },
      session: { user },
    } = req;
    const video = await client.video.create({
      data: {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        category,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      video,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  }),
);
