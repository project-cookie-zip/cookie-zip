import Image from "next/image";
import styled from "styled-components";

export const Footer = () => {
  return (
    <Container>
      <Image src={require("../../images/cookieHome.png")} alt="홈" />
      <Image src={require("../../images/cookieUpload.png")} alt="업로드" />
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

  & img {
    width: 40px;
    height: 40px;
    &:active {
      border-radius: 15px;
      background-color: #e7e7e7;
    }
  }
`;
