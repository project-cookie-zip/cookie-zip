import { List } from "src/components/list/List";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { baseImageData } from "@utils/client/baseImage";
import Image from "next/image";
import { useState } from "react";

export default function MyPage() {
  const getMyInfo = async () => {
    const { data } = await axios.get(`/api/users/me`);
    console.log(data);
    return data?.profile;
  };

  const { data } = useQuery({
    queryKey: ["getMyInfo"],
    queryFn: getMyInfo,
  });
  console.log(data);

  const baseImage = baseImageData(data?.id);

  //userImage 업로드

  const [testSend, setTestSend] = useState("");

  const uploadImage = (file: any) => {
    setTestSend(file);
  };

  const addImage = async () => {
    let formData = new FormData();
    formData.append("file", testSend);

    const {
      data: { id, uploadURL },
    } = await axios.get("/api/image");
    // console.log(data);
    // console.log(uploadURL, id);
    const {
      data: {
        result: { variants },
      },
    } = await axios.post(uploadURL, formData);

    // console.log("data1", data1);

    // const data = await (
    //   await fetch(
    //     // `https://api.cloudflare.com/client/v4/accounts/e564ea5cae1cb0fb8004a589abe35f63/stream/${id}`,
    //     // `https://api.cloudflare.com/cdn-cgi/imagedelivery/e564ea5cae1cb0fb8004a589abe35f63/${id}/public`,
    //     `https://api.cloudflare.com/client/v4/accounts/e564ea5cae1cb0fb8004a589abe35f63/images/v1/${id}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer 2PptoKx0NQLjSOoPxLgePH2I6GztAIx1p-hKv6Z0`,
    //         "Content-Type": "application/json",
    //       },
    //     },
    //   )
    // ).json();
    // console.log(data);
    await axios.post("/api/users/me", {
      // email,
      avatar: variants[1],
      // nickname,
    });
  };

  return (
    <>
      <STTopBar>
        <STMenu>홈</STMenu>
        <STMenu>좋아요</STMenu>
        <STMenu>채널정보</STMenu>
      </STTopBar>
      <STProfile>
        <STAvatarBox>
          <Image
            src={data?.avatar ? data?.avatar : baseImage}
            alt="프로필사진"
            width={60}
            height={60}
            unoptimized={true}
          />
          <Image
            className="edit"
            src={require("../../src/images/cookieEdit.png")}
            alt="https://icons8.com/icon/WLubF9R6RUtV/upload-to-cloud Upload to Cloud icon by https://icons8.com Icons8"
            width={25}
            height={25}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e: any) => {
              uploadImage(e.target.files[0]);
            }}
          />
          <button onClick={addImage} type="button">
            사진 업로드
          </button>
        </STAvatarBox>
        <span className="nickname">{data?.name}</span>
        <div>
          <span>구독자 10명 ∙ 동영상 10개</span>
        </div>
      </STProfile>
      <List />
    </>
  );
}

const STTopBar = styled.div`
  margin-top: 43px;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #a9653b;
  border-bottom: 1px solid #a9653b;
`;

const STMenu = styled.div`
  font-size: 21px;
`;

const STProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  & div {
    margin: 8px;
  }
  .nickname {
    font-size: 28px;
  }
`;

const STAvatarBox = styled.span`
  display: flex;
  position: relative;
  .edit {
    position: absolute;
    bottom: 0;
    right: -28px;
  }
`;

const STChannelName = styled.div`
  border-radius: 50%;
  font-size: 20px;
  text-align: center;
  line-height: 70px;
  background-color: #c97f4ebb;
  color: white;
  width: 70px;
  height: 70px;
  margin: 0 10px;
`;
