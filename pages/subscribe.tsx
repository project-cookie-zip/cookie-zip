import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";
import { SubsBtn } from "src/components/videos/video/SubsBtn";

export default function Subscribe() {
  const router = useRouter();

  // subscribe data
  const userData = async () => {
    const data = await axios.get(`/api/users/me`);
    return data?.data.subscribeList;
  };
  const { data, isLoading, isError } = useQuery("myData", userData, {
    refetchOnWindowFocus: false,
  });

  // random image data
  const baseImage = (userId: number) => {
    const baseImage: string = `https://source.boringavatars.com/beam/110/$${userId}?colors=DF9E75,A9653B,412513,412510,412500`;
    return baseImage;
  };

  // useMutation
  // const subscribeAPI = async () => {
  //   const subsUpdate = await axios.post(
  //     `/api/subscribe/${data[0]?.createdFor.id}`,
  //   );
  // };
  // const subsMutation = useMutation(subscribeAPI);

  // // subscribe active
  // const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
  // const subscribeBtn = async () => {
  //   isSubscribed ? setIsSubscribed(false) : setIsSubscribed(true);
  //   subsMutation.mutate();
  // };

  return (
    <Conteiner>
      <CancelBar onClick={() => router.back()}>
        <span>내 구독</span>
        <span>{"←"}</span>
      </CancelBar>
      <CardBox>
        {data?.length === 0 ? (
          <div>구독 정보가 없네요</div>
        ) : (
          data?.map((item: any, index: number) => {
            return (
              <>
                <CardBody key={item?.createdFor.id}>
                  <CardUserInfo>
                    <Image
                      src={
                        item?.createdFor.avatar === null
                          ? baseImage(item?.createdFor.id)
                          : item?.createdFor.avatar
                      }
                      alt="프로필"
                      width={60}
                      height={60}
                      unoptimized={true}
                    />
                    <span>{item?.createdFor.name}</span>
                  </CardUserInfo>
                  {/* <button onClick={() => subscribeBtn()}>
                    {isSubscribed ? "구독취소" : "구독"}
                  </button> */}
                  <SubsBtn createdUserId={item?.createdFor.id} />
                </CardBody>
              </>
            );
          })
        )}
      </CardBox>
    </Conteiner>
  );
}

const Conteiner = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;

  width: 95vw;
`;

const CancelBar = styled.div`
  width: 95vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & span:first-child {
    font-size: 20px;
    font-weight: bold;
  }
  & span:last-child {
    font-size: 40px;
    font-weight: bold;
  }
`;

const CardBox = styled.div`
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;

const CardBody = styled.div`
  margin-bottom: 20px;
  width: 90vw;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & button {
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
  }
`;

const CardUserInfo = styled.div`
  display: flex;
  align-items: center;
  & img {
    margin-right: 10px;
  }
`;
