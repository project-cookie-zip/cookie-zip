import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Subscribe() {
  const router = useRouter();
  const baseImage: string = `https://source.boringavatars.com/beam/110/$1?colors=DF9E75,A9653B,412513,412510,412500`;

  return (
    <Conteiner>
      <CancelBar onClick={() => router.back()}>
        <span>내 구독</span>
        <span>{"←"}</span>
      </CancelBar>
      <CardBox>
        <CardBody>
          <CardUserInfo>
            <Image
              src={baseImage}
              alt="프로필"
              width={60}
              height={60}
              unoptimized={true}
            />
            <span>닉네임</span>
          </CardUserInfo>
          <button>구독취소</button>
        </CardBody>
        <CardBody>
          <CardUserInfo>
            <Image
              src={baseImage}
              alt="프로필"
              width={60}
              height={60}
              unoptimized={true}
            />
            <span>닉네임</span>
          </CardUserInfo>
          <button>구독취소</button>
        </CardBody>
        <CardBody>
          <CardUserInfo>
            <Image
              src={baseImage}
              alt="프로필"
              width={60}
              height={60}
              unoptimized={true}
            />
            <span>닉네임</span>
          </CardUserInfo>
          <button>구독취소</button>
        </CardBody>
        <CardBody>
          <CardUserInfo>
            <Image
              src={baseImage}
              alt="프로필"
              width={60}
              height={60}
              unoptimized={true}
            />
            <span>닉네임</span>
          </CardUserInfo>
          <button>구독취소</button>
        </CardBody>
        <CardBody>
          <CardUserInfo>
            <Image
              src={baseImage}
              alt="프로필"
              width={60}
              height={60}
              unoptimized={true}
            />
            <span>닉네임</span>
          </CardUserInfo>
          <button>구독취소</button>
        </CardBody>
        <CardBody>
          <CardUserInfo>
            <Image
              src={baseImage}
              alt="프로필"
              width={60}
              height={60}
              unoptimized={true}
            />
            <span>닉네임</span>
          </CardUserInfo>
          <button>구독취소</button>
        </CardBody>
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
