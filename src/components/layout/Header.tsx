import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { useLoginCheck } from "src/hooks/useLoginCheck";
import { baseImageData } from "@utils/client/baseImage";
import { useMyData } from "src/hooks/getAPIs/useMyData";

interface childProps {
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({ setIsDark }: childProps) => {
  const isLogin: boolean = useLoginCheck();

  const { data } = useMyData();

  const darkModeHandler = () => {
    if (localStorage.getItem("cookie-dark") === "false") {
      setIsDark(true);
    } else {
      localStorage.setItem("cookie-dark", "false");
      setIsDark(false);
    }
  };
  // console.log("프로필", data);
  return (
    <Container>
      <Logo>
        <Link href={"/"}>
          <Image src={require("../../images/cookieLogo.png")} alt="logo" />
        </Link>
      </Logo>
      {isLogin ? (
        <TopNav>
          <span>
            <input type="checkbox" id="toggle" />
            <label
              onClick={darkModeHandler}
              htmlFor="toggle"
              className="toggleSwitch"
            >
              <span className="toggleButton"></span>
            </label>
          </span>
          <Image src={require("../../images/cookieSearch.png")} alt="검색" />
          <Image src={require("../../images/cookieAlert.png")} alt="알림" />
          <Link href={"/mypage"}>
            <Image
              src={
                data?.profile.avatar
                  ? data?.profile.avatar
                  : baseImageData(data?.profile.id)
              }
              alt="프로필사진"
              width={30}
              height={30}
              unoptimized={true}
            />
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
  transition: 0.3s;
  background-color: ${props => props.theme.backgroundColor};
  top: 0;
  position: fixed;
  min-width: 480px;
  display: flex;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #a9653b;
`;

const Logo = styled.div`
  & img {
    width: 100px;
    height: 40px;
    border-radius: 50px;
  }
`;

const TopNav = styled.div`
  display: flex;
  align-items: center;
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

  // hide input
  & input {
    display: none;
    -webkit-tap-highlight-color: transparent;
  }
  & label:focus {
    -webkit-tap-highlight-color: transparent;
  }

  // toggle
  & .toggleSwitch {
    width: 40px;
    height: 20px;
    display: block;
    position: relative;
    border-radius: 30px;
    background-color: #fff;
    box-shadow: 0 0 3px 0px gray;
    cursor: pointer;
  }

  .toggleSwitch .toggleButton {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 50%;
    left: 4px;
    transform: translateY(-50%);
    border-radius: 50%;
    background: #a9653b;
  }
  #toggle:checked ~ .toggleSwitch {
    background: #a9653b;
  }

  #toggle:checked ~ .toggleSwitch .toggleButton {
    left: 21px;
    background: #fff;
  }

  // button
  .toggleSwitch,
  .toggleButton {
    transition: all 0.2s ease-in;
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
