import { List } from "src/components/list/List";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";

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

  // const getMyInfo = async () => {
  //   const { data } = await axios.get(`/api/users/me`);

  // };

  // useEffect(() => {
  //   getMyInfo();
  // }, []);

  return (
    <>
      <STTopBar>
        <STMenu>홈</STMenu>
        <STMenu>좋아요</STMenu>
        <STMenu>채널정보</STMenu>
      </STTopBar>
      <STProfile>
        <STChannelName>채널명</STChannelName>
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
