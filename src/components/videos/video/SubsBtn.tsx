import styled from "styled-components";
import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { videoAPI } from "src/shared/api";
import { myAPI } from "src/shared/api";

export const SubsBtn = ({ createdUserId }: any) => {
  // Router pathname
  const { pathname } = useRouter();

  // useMutation
  const subscribeAPI = async () => {
    const subsUpdate = await videoAPI.postSubsReq(createdUserId);
  };
  const subsMutation = useMutation(subscribeAPI);

  // subscribe active
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const subscribeBtn = async () => {
    isSubscribed ? setIsSubscribed(false) : setIsSubscribed(true);
    subsMutation.mutate();
  };

  // subscribe data match
  const subsData = async () => {
    const { data } = await myAPI.getMyData();
    console.log(data);
    data?.subscribeList.map((item: any) => {
      item.createdFor.id === createdUserId ? setIsSubscribed(true) : null;
    });
  };

  // subscribed boolean
  useEffect(() => {
    pathname.split("/")[1] === "subscribe" ? setIsSubscribed(true) : null;
  }, [pathname]);

  return (
    <SubscribeBtn onClick={() => subscribeBtn()}>
      {isSubscribed ? "구독취소" : "구독"}
    </SubscribeBtn>
  );
};

const SubscribeBtn = styled.button`
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  width: 70px;
  height: 30px;
  color: white;
  font-weight: bold;
  background-color: #df9e75;
  transition: 0.3s;
  &:active {
    background-color: #a9653b;
  }
`;
