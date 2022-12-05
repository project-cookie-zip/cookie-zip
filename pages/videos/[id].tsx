import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Accordion } from "src/components/videos/video/Accordion";
import { LikeBtn } from "src/components/videos/video/LikeBtn";
import { SubsBtn } from "src/components/videos/video/SubsBtn";
import { TimeToToday } from "@utils/client/timeToToday";
import { LoadingSpinner } from "src/components/videos/video/LoadingSpinner";
import { baseImageData } from "@utils/client/baseImage";

export default function DetailPost({ videoDatas }: any) {
  const { query } = useRouter();
  console.log("페이지 패스네임", query);

  // video data fetch
  const apiTest = async () => {
    const data = await axios.get(`/api/videos/${query.id}`);
    return data?.data.video;
  };
  const { data, isError, isLoading } = useQuery("getVideoData", apiTest, {
    refetchOnWindowFocus: false,
  });
  // 구독자수 처리 예정
  // console.log("구독자수", data?.comments.length);

  // user base Image
  const baseImage = baseImageData(data?.user.id);
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
            <Title>{data?.title}</Title>
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
              <span className="userName">{data?.user.name}</span>
              <span>구독자수(10만)</span>
            </UsersData>
            <SubsBtn createdUserId={data?.user.id} />
          </UserInfo>
          <SideBtnsWrap>
            <LikeBtn
              likeCount={data?._count.likes}
              pageQuery={query?.id}
              videoState={data}
            />
          </SideBtnsWrap>
          <Accordion baseImage={baseImage} videoState={data} />
          <ContentWrap>
            <span>{data?.description}</span>
          </ContentWrap>
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
  & .userName {
    color: black;
    font-weight: bold;
    font-size: 20px;
  }
`;

const SideBtnsWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
`;

const ContentWrap = styled.div`
  border-bottom: 1px solid #e5e8eb;
  padding-bottom: 50px;
  margin: 10px 0 100px 0;
  max-width: 480px;
  width: 95vw;
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
