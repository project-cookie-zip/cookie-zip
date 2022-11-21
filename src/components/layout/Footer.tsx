import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { useLoginCheck } from "../../hooks/useLoginCheck";

export const Footer = () => {
  const loginCheck = useLoginCheck();
  console.log(loginCheck);

  return (
    <Container>
      <Link href={"/"}>
        <Image src={require("../../images/cookieHome.png")} alt="홈" />
      </Link>
      <Link href={"/videos/add"}>
        <Image src={require("../../images/cookieUpload.png")} alt="업로드" />
      </Link>
      <Image
        src={require("../../images/cookieOthers.png")}
        alt="보관함/구독/좋아요 등"
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  margin: 0 auto;
  margin-top: 120px;
  position: absolute;
  background-color: #df9e75;
  bottom: 0;

  max-width: 480px;
  width: 100vw;
  height: 50px;
  z-index: 11;

  & img {
    width: 40px;
    height: 40px;
    &:active {
      border-radius: 15px;
      background-color: #e7e7e7;
    }
  }
`;
