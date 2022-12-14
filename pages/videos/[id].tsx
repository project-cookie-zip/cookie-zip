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

  // video data fetch
  // const apiTest = async () => {
  //   const data = await axios.get(`/api/videos/${query.id}`);
  //   return data?.data.video;
  // };
  // const { data, isError, isLoading } = useQuery("getVideoData", apiTest, {
  //   refetchOnWindowFocus: false,
  // });

  // SSP 적용으로 react query가 불필요해짐에 따라 임시 로딩 불리언 추가
  const isLoading: boolean = false;

  // 구독자수 처리 예정
  // console.log("구독자수", data?.comments.length);

  // user base Image
  const baseImage = baseImageData(videoDatas?.user.id);

  const deleteVideo = async () => {
    await axios.delete("/api/videos", videoDatas?.id);
  };

  return (
    <Container>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <VideoWrap>
            <VideoView src={videoDatas?.videoUrl} allow="fullscreen" />
          </VideoWrap>
          <ContentHeader>
            <Title>{videoDatas?.title}</Title>
            <SideInfo>
              <span>조회수 {videoDatas?.views}회</span>
              <span>{TimeToToday(new Date(videoDatas?.createdAt))}</span>
            </SideInfo>
            <button onClick={deleteVideo}>삭제버튼</button>
          </ContentHeader>
          <UserInfo>
            <UsersData>
              <Link href={"/"}>
                <Image
                  src={
                    videoDatas?.user.avatar
                      ? videoDatas?.user.avatar
                      : baseImage
                  }
                  alt="프로필사진"
                  width={60}
                  height={60}
                  unoptimized={true}
                />
              </Link>
              <span className="userName">{videoDatas?.user.name}</span>
              <span>구독자수(10만)</span>
            </UsersData>
            <SubsBtn createdUserId={videoDatas?.user.id} />
          </UserInfo>
          <SideBtnsWrap>
            <LikeBtn
              likeCount={videoDatas?._count.likes}
              pageQuery={query?.id}
              videoState={videoDatas}
            />
          </SideBtnsWrap>
          <Accordion baseImage={baseImage} videoState={videoDatas} />
          <ContentWrap>
            <span>{videoDatas?.description}</span>
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
  transition: 0.3s;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.mainFontColor};

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
    color: ${props => props.theme.subFontColor};
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
  color: ${props => props.theme.mainFontColor};

  & span {
    margin: 0 5px 0 5px;
    color: #929292;
  }
  & .userName {
    transition: 0.3s;
    color: ${props => props.theme.mainFontColor};
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
// 에러 해결 완료 - headers의 Cookie data로 처리

import fetch from "isomorphic-unfetch";
import video from "pages/api/video";

export const getServerSideProps = async (context: any) => {
  try {
    const { req, query } = context;
    const videos: any = await (
      await fetch(
        `${process.env.LOCAL_BASE_URL}/api/videos/${query.id}`,
        // `http://localhost:3000/api/videos`,
        {
          headers: {
            // Authorization: "Bearer 2PptoKx0NQLjSOoPxLgePH2I6GztAIx1p-hKv6Z0",
            // "Content-Type": "application/json",

            // SSP 작업 시 참고 *
            // 현재 요청 시 plz log in error가 발생하여
            // Cookie 값을 임의로 넣어주고 있습니다.
            Cookie: process.env.GET_API_HEADERS_COOKIE,
          },
        },
      )
    ).json();
    const videoDatas = videos.video;
    return {
      props: { videoDatas },
    };
  } catch (error) {
    const videoDatas = { error: error };
    console.log(error);
    return {
      props: {
        videoDatas,
      },
    };
  }
};
