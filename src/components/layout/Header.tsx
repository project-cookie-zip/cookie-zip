import Image from "next/image";
import styled from "styled-components";

export const Header = () => {
  return (
    <Container>
      <Logo>
        <Image src={require("../../images/cookieLogo.png")} alt="logo" />
      </Logo>
      <TopNav>
        <Image src={require("../../images/cookieAlert.png")} alt="알림" />
        <Image src={require("../../images/cookieSearch.png")} alt="검색" />
        <Image src={require("../../images/cookieAva.png")} alt="프로필" />
      </TopNav>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  & img {
    width: 100px;
    height: 40px;
  }
`;

const TopNav = styled.div`
  & img {
    width: 30px;
    height: 30px;
    margin: 0 5px 0 5px;
    padding: 5px;
    &:active {
        border-radius:15px;
      background-color: #e7e7e7;
    }
  }
`;
