import React from "react";
import styled from "styled-components";
import { baseImageData } from "@utils/client/baseImage";
import Link from "next/link";
import Image from "next/image";
import { TimeToToday } from "@utils/client/timeToToday";

export default function MyVideoItem({ myVideos }: any): JSX.Element {
  return (
    <STContainer>
      <Link href={`/videos/${myVideos?.id}`}>
        <STVideoBox>
          <STImage src={myVideos?.thumbnailUrl} alt="썸네일" />
        </STVideoBox>
      </Link>
      <STContentBox>
        <Image
          src={
            myVideos?.user.avatar
              ? myVideos?.user.avatar
              : baseImageData(myVideos.userId)
          }
          alt="프로필사진"
          width={50}
          height={50}
          unoptimized={true}
        />
        <STContent>
          <STTitle>{myVideos?.title}</STTitle>
          <div>
            <span>
              {myVideos?.user?.name} ∙ 조회수 {myVideos?.views} ∙{" "}
              {TimeToToday(new Date(myVideos?.createdAt))}
            </span>
          </div>
        </STContent>
      </STContentBox>
    </STContainer>
  );
}

const STContainer = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  display: flex;
  flex-direction: column;
  width: 460px;
  height: 310px;
  margin: 0 auto;
  margin-bottom: 40px;
  transition: 0.3s;
  box-shadow: ${props => props.theme.boxShadow};
`;

const STVideoBox = styled.div`
  border-bottom: 1px solid #754423;
  height: 240px;
  width: 100%;
`;

const STImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const STContentBox = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  & span {
    font-size: 13px;
    color: gray;
  }
  & img {
    margin: 10px;
    border-radius: 50%;
  }
`;

const STContent = styled.div`
  display: flex;
  flex-direction: column;
  & span {
    transition: 0.3s;
    color: ${props => props.theme.subFontColor};
  }
`;

const STTitle = styled.div`
  transition: 0.3s;
  color: ${props => props.theme.mainFontColor};
`;
