import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";

// cloudflare 이미지/비디오 업로드 방식
// cloudflare를 통해 직접 이미지를 업로드하게 되면 많은 비용을 지불할 수 도 있음.
// direct_upload라는 기능을 사용하여 아래 url을 통해 이미지를 넣을 수 있는 빈 url을 만들고,
// front에서 직접 이미지를 업로드하여 cloudflare에 저장을 한다.
// backend는 저장된 이미지의 url을 반환하는 방식.

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const maxDurationSeconds = 3600;
  const thumbnailTimestampPct = 0.529241;
  const data = { maxDurationSeconds, thumbnailTimestampPct };
  const body = JSON.stringify(data);
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_CLIENT_ID}/stream/direct_upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
        body,
      },
    )
  ).json();
  console.log(response);
  res.json({
    ok: true,
    ...response.result,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
    isPrivate: false,
  }),
);
