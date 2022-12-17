import styled from "styled-components";
import Image from "next/image";
import { baseImageData } from "@utils/client/baseImage";

export const CannotDesktop = () => {
  return (
    <Background>
      <Image
        src={require("../images/cookieLogo.png")}
        width={700}
        height={230}
        alt="not here"
        className="logo"
        priority
      />
      <Container>
        <ImageBox>
          <Image
            src={baseImageData(0)}
            width={120}
            height={120}
            unoptimized={true}
            alt="not here"
          />
          <Image
            src={baseImageData(10)}
            width={120}
            height={120}
            unoptimized={true}
            alt="not here"
          />
          <Image
            src={baseImageData(100)}
            width={120}
            height={120}
            unoptimized={true}
            alt="not here"
          />
        </ImageBox>
        <p>아직은 모바일에서만 만나요오</p>
        <span>화면을 줄여도 볼 수 있어요!</span>
      </Container>
    </Background>
  );
};

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ad7e61;
  & .logo {
    margin-top: 15vh;
    background-color: #995931;
    border-radius: 70px;
    width: 70vw;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vw;
  height: 100vh;
  color: white;

  & p {
    font-size: 2rem;
    font-weight: bold;
  }
  & span {
    font-size: 1.3rem;
  }
`;

const ImageBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 80px;
  & img {
    margin: 0 50px 0 50px;
  }
`;
