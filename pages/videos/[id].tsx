import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import Router from "next/router";
import { useRouter } from "next/router";
import { Accordion } from "src/components/videos/video/Accordion";
import { LikeBtn } from "src/components/videos/video/LikeBtn";
import { SubsBtn } from "src/components/videos/video/SubsBtn";
import { TimeToToday } from "@utils/client/timeToToday";
import { baseImageData } from "@utils/client/baseImage";
import { videoAPI } from "src/shared/api";
import { useMyData } from "src/hooks/getAPIs/useMyData";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

//test code
// data fetch SSP 적용 - videoDatas
export default function DetailPost({ videoDatas }: any) {
  const { query } = useRouter();

  // 구독자수 처리 예정
  // console.log("구독자수", data?.comments.length);

  // user base Image
  const baseImage = baseImageData(videoDatas?.user?.id);

  const deleteVideo = async () => {
    Swal.fire({
      title: "정말 삭제할까요?",
      icon: "question",
      confirmButtonColor: "#A9653B",
      confirmButtonText: "삭제하기",
      showCancelButton: true,
      cancelButtonText: "취소",
      cancelButtonColor: "#ad8f7d",
      width: "80vw",
    }).then(async result => {
      if (result.value) {
        try {
          await videoAPI.deleteVideo(videoDatas?.id);
          Swal.fire({
            title: "삭제완료!",
            icon: "success",
            confirmButtonColor: "#A9653B",
            confirmButtonText: "홈으로",
            width: "80vw",
          }).then(result => {
            if (result.value) {
              Router.push("/");
            }
          });
        } catch (error) {
          Swal.fire({
            title: "다시 시도해주세요 ㅠ",
            icon: "warning",
            confirmButtonColor: "#A9653B",
            confirmButtonText: "확인",
            width: "80vw",
          });
        }
      }
    });
  };

  // isMyVideo?:
  const myData = useMyData();
  const [isMe, setIsMe] = useState<boolean>(false);
  useEffect(() => {
    if (myData?.data?.profile?.id === videoDatas?.userId) {
      setIsMe(true);
    }
  }, [myData, videoDatas]);

  return (
    <Container>
      <VideoWrap>
        <VideoView src={videoDatas?.videoUrl} allow="fullscreen" />
      </VideoWrap>
      <ContentHeader>
        <Title>{videoDatas?.title}</Title>
        <SideInfo>
          <span>조회수 {videoDatas?.views}회</span>
          <span>{TimeToToday(new Date(videoDatas?.createdAt))}</span>
        </SideInfo>
      </ContentHeader>
      <UserInfo>
        <UsersData>
          <Link href={"/"}>
            <Image
              src={
                videoDatas?.user?.avatar ? videoDatas?.user?.avatar : baseImage
              }
              alt="프로필사진"
              width={60}
              height={60}
              unoptimized={true}
            />
          </Link>
          <span className="userName">{videoDatas?.user?.name}</span>
          <span>구독자수(10만)</span>
        </UsersData>
        <SubsBtn createdUserId={videoDatas?.user?.id} />
      </UserInfo>
      <SideBtnsWrap>
        <LikeBtn
          likeCount={videoDatas?._count?.likes}
          pageQuery={query?.id}
          videoState={videoDatas}
        />
        <span
          style={isMe ? { display: "block" } : { display: "none" }}
          onClick={deleteVideo}
          className="deleteVideo"
        >
          삭제
        </span>
      </SideBtnsWrap>
      <Accordion baseImage={baseImage} videoState={videoDatas} />
      <ContentWrap>
        <span>{videoDatas?.description}</span>
      </ContentWrap>
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
  height: 100vh;
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
  justify-content: space-between;
  width: 100vw;

  & .deleteVideo {
    padding-right: 20px;
    font-size: 14px;
  }
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

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    params: { id },
  }: any = context;

  const video = await client?.video.findUnique({
    where: { id: Number(id) },
  });
  return { props: { videoDatas: JSON.parse(JSON.stringify(video)) } };
};
