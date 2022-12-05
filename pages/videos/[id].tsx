import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Accordion } from "src/components/videos/video/Accordion";
import { LikeBtn } from "src/components/videos/video/LikeBtn";
import { TimeToToday } from "@utils/client/timeToToday";
import { LoadingSpinner } from "src/components/videos/video/LoadingSpinner";

export default function DetailPost({ videoDatas }: any) {
  const { query } = useRouter();
  console.log("페이지 패스네임", query);

  const [videoData, setVideoData] = useState<any>();

  const getVideo = async () => {
    const { data } = await axios.get(`/api/videos/${query.id}`);
    setVideoData(data.video);
  };
  // console.log("SSPdata", videoDatas);

  const { data, isError, isLoading } = useQuery({
    queryKey: "getVideoData",
    queryFn: apiTest,
  });
  console.log(data);
  // console.log(data?._count.likes);

  const baseImage: string = `https://source.boringavatars.com/beam/110/$${data?.user.id}?colors=DF9E75,A9653B,412513,412510,412500`;

  return (
    <Container>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <VideoWrap>
            <VideoView src={data?.videoUrl} allow="fullscreen" />
          </VideoWrap>
          <ContentHeader>
            <Title>제목</Title>
            <SideInfo>
              <span>조회수 {data?.views}회</span>
              <span>{TimeToToday(new Date(data?.createdAt))}</span>
            </SideInfo>
          </ContentHeader>
          <UserInfo>
            <UsersData>
              <Link href={"/"}>
                <Image
                  src={data?.user.avatar ? data?.user.avatar : baseImage}
                  alt="프로필사진"
                  width={60}
                  height={60}
                  unoptimized={true}
                />
              </Link>
              <span>UserID에옹</span>
              <span>구독자수(10만)</span>
            </UsersData>
            <SubscribeBtn>구독</SubscribeBtn>
          </UserInfo>
          <SideBtnsWrap>
            <LikeBtn likeCount={data?._count.likes} pageQuery={query?.id} />
          </SideBtnsWrap>
          <Accordion baseImage={baseImage} videoState={data} />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100vw;

  animation: addPostFadein 0.3s;
  @keyframes addPostFadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const VideoWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 300px;
`;

const VideoView = styled.iframe`
  width: 100vw;
  height: 300px;
`;

const ContentHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  padding: 7px;
  font-size: 20px;
  font-weight: bold;
`;

const SideInfo = styled.div`
  margin-top: 5px;
  display: flex;

  & span {
    margin: 0 5px 0 5px;
    color: #929292;
  }
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UsersData = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;

  & span {
    margin: 0 5px 0 5px;
    color: #929292;
  }
`;

const SubscribeBtn = styled.button`
  padding: 5px;
  margin-right: 20px;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  width: 60px;
  height: 40px;
  background-color: #df9e75;
`;
const subscribeCancle = styled.button`
  padding: 5px;
  margin-right: 20px;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  width: 60px;
  height: 40px;
  background-color: #df9e75;
`;

const SideBtnsWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
`;

const LikesBtns = styled.div`
  padding: 10px;

  & button {
    border: none;
    background: none;
    border-radius: 15px;
    /* width: 40px;
    height: 40px; */

    &:active {
      background-color: #ececec;
    }
  }
`;

// SSP -- 데이터 URL은 맞으나 plz login err 발생(post man도 동일)
// react query로 처리 예정
// SSP 사용 자제 예정
// import fetch from "isomorphic-unfetch";
// import { prisma } from "@prisma/client";
export const getServerSideProps = async (context: any) => {
  try {
    const { req } = context;
    // console.log("reqTTest", req);
    console.log("컨텍스트 무수한데이터", context);
    let pathname = req.url
      .split("/")
      [req.url.split("/").length - 1].split(".")[0];
    console.log("hello pathname", pathname);
    const res = await axios.get(`localhost:3000/api/videos/${pathname}`);
    const videoDatas = res.data;
    // const videoDatas = req;
    console.log("ttest", videoDatas);

    // const videoDatas = { pathname: "something" };

    return {
      props: {
        videoDatas,
      },
    };
  } catch (error) {
    const videoDatas = { success: false };
    console.log(error);
    return {
      props: {
        videoDatas,
      },
    };
  }
};
