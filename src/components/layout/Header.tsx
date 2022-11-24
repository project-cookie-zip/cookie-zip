import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { useLoginCheck } from "src/hooks/useLoginCheck";

export const Header = () => {
  const isLogin = useLoginCheck();

  return (
    <Container>
      <Logo>
        <Link href={"/"}>
          <Image src={require("../../images/cookieLogo.png")} alt="logo" />
        </Link>
      </Logo>
      {isLogin ? (
        <TopNav>
          <Image src={require("../../images/cookieAlert.png")} alt="알림" />
          <Image src={require("../../images/cookieSearch.png")} alt="검색" />
          <Link href={"/mypage"}>
            <Image src={require("../../images/cookieAva.png")} alt="프로필" />
          </Link>
        </TopNav>
      ) : (
        <Link href={"/login"}>
          <LoginBtn>로그인</LoginBtn>
        </Link>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  top: 0;
  position: fixed;
  min-width: 480px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #a9653b;
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
      border-radius: 15px;
      background-color: #e7e7e7;
    }
  }
`;

const LoginBtn = styled.button`
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  width: 60px;
  height: 30px;
  color: white;
  font-weight: bold;
  background-color: #df9e75;
  transition: 0.3s;
  &:active {
    background-color: #a9653b;
  }
`;
