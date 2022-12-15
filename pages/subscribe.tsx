import styled from "styled-components";
import Image from "next/image";
import axios from "axios";
import uuid from "react-uuid";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { baseImageData } from "@utils/client/baseImage";
import { SubsBtn } from "src/components/videos/video/SubsBtn";
import { myAPI } from "src/shared/api";

export default function Subscribe() {
  const router = useRouter();

  // subscribe data
  const userData = async () => {
    const data = await myAPI.getMyData();
    return data?.data.subscribeList;
  };
  const { data } = useQuery("myData", userData, {
    refetchOnWindowFocus: false,
  });

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
          data?.map((item: any) => {
            return (
              <>
                <CardBody key={uuid()}>
                  <CardUserInfo>
                    <Image
                      src={
                        item?.createdFor.avatar === null
                          ? baseImageData(item?.createdFor.id)
                          : item?.createdFor.avatar
                      }
                      alt="프로필"
                      width={60}
                      height={60}
                      unoptimized={true}
                    />
                    <span>{item?.createdFor.name}</span>
                  </CardUserInfo>
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
    border-radius: 50px;
  }
`;
