import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@utils/server/withHandler";
import client from "@utils/server/client";
import { withApiSession } from "@utils/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  if (req.method === "POST") {
    const {
      query: { id },
      session: { user },
      body: { content },
    } = req;
    const newAnswer = await client.comment.create({
      data: {
        user: {
          connect: {
            id: Number(user?.id),
          },
        },
        video: {
          connect: {
            id: Number(id),
          },
        },
        content,
      },
    });

    const returnAnswer = await client.comment.findUnique({
      where: {
        id: newAnswer.id,
      },
      include: {
        user: true,
      },
    });
    res.json({
      ok: true,
      answer: returnAnswer,
    });
  }

  if (req.method === "DELETE") {
    const {
      session: { user },
      body: { commentId },
    } = req;
    const targetComment = await client.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (targetComment?.userId === user?.id) {
      await client.comment.delete({
        where: {
          id: Number(commentId),
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
    methods: ["POST", "DELETE"],
    handler,
    isPrivate: false,
  }),
);
