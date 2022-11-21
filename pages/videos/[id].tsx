import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Accordion } from "src/components/videos/video/Accordion";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DetailPost() {
  const baseImage: string = `https://source.boringavatars.com/beam/110/$1?colors=DF9E75,A9653B,412513,412510,412500`;

  const [videoTest, setVideoTest] = useState("");
  const getVideo = async () => {
    const { data } = await axios.get(`/api/videos/${1}`);
    console.log(data);
    console.log(data.video.videoUrl);
    setVideoTest(data?.video.videoUrl);
  };

  useEffect(() => {
    getVideo();
  }, []);

  // subscribe
  const toSubscribe = () => {
    console.log("구독");
  };

  // likes
  const likeUp = () => {
    console.log("좋아용");
  };
  const likeDown = () => {
    console.log("싫어용");
  };

  return (
    <Container>
      <VideoWrap>
        <VideoView
          // src="https://embed.cloudflarestream.com/embed/iframe-player.4eff9464.js"
          src={videoTest}
          allow="fullscreen"
          // controls
        />
      </VideoWrap>
      <ContentHeader>
        <Title>제목</Title>
        <SideInfo>
          <span>조회수00회</span>
          <span>1일 전</span>
        </SideInfo>
      </ContentHeader>
      <UserInfo>
        <UsersData>
          <Link href={"/"}>
            <Image
              src={baseImage}
              alt="프로필사진"
              width={60}
              height={60}
              unoptimized={true}
            />
          </Link>
          <span>UserID에옹</span>
          <span>구독자수(10만)</span>
        </UsersData>
        <SubscribeBtn onClick={() => toSubscribe()}>구독</SubscribeBtn>
      </UserInfo>
      <SideBtnsWrap>
        {/* 싫어요 없애고 좋아요만 남길까 생각중 */}
        <LikesBtns>
          <button onClick={() => likeUp()}>
            <Image
              src={require("../../src/images/cookieLike.png")}
              alt=""
              width={40}
            />
          </button>
          <button onClick={() => likeDown()}>
            <Image
              src={require("../../src/images/cookieUnLike.png")}
              alt=""
              width={40}
            />
          </button>
        </LikesBtns>
      </SideBtnsWrap>
      <Accordion baseImage={baseImage} />
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
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
  width: 100vw;
  height: 300px;
`;

// const VideoView = styled.video`
//   width: 100vw;
//   height: 300px;
// `;
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
