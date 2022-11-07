import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div>
      <Logo>
        <Image src={require("../../src/images/thumbnail.png")} alt="알림" />
      </Logo>
      <Hr />

      <Div>
        <Text>이메일</Text>
        <Input placeholder="이메일을 입력하세요" />
      </Div>

      <Div>
        <Text>비밀번호</Text>
        <Input placeholder="비밀번호를 입력하세요" />
      </Div>

      <ButtonDiv>
        <Button>
          <Link href="/login">
            <ButtonText>로그인</ButtonText>
          </Link>
        </Button>
        <Link href="/sign">
          {" "}
          <SignButton>
            <ButtonText className="text">회원가입</ButtonText>
          </SignButton>
        </Link>
      </ButtonDiv>
    </div>
  );
}
const Input = styled.input`
  font-size: 20px;
  margin: 0 auto;
  padding: 0px 10px;
  height: 5vh;
  max-width: 480px;
  width: 100%;
  border: solid;
  border-color: #bf832a;
  border-radius: 5px;
  outline: none;
`;
const Sign = styled.h5`
  //padding: 20px;
  //background-color: #9d6511;
`;
const Text = styled.h5`
  margin: 10px 0px;
`;
const Div = styled.div`
  margin: 40px 0px;
  padding: 0px 30px;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.div`
  & img {
    width: 100%;
    height: 80px;
    padding-left: 3px;
  }
  margin-top: 40px;
`;
const Hr = styled.hr`
  border-bottom: 10px double #b46b2e;
  margin-bottom: 150px;
`;
const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button = styled.button`
  & a {
    text-decoration: none;
  }
  justify-content: space-around;
  margin: 40px 40px 0px 40px;
  height: 80px;
  width: 200px;
  background-color: #dea97e;
  border: solid;
  border-color: transparent;
  border-radius: 5px;
`;
const SignButton = styled.button`
  & a {
    text-decoration: none;
  }
  width: 200px;
  background-color: transparent;
  border: solid;
  border-color: transparent;
  border-radius: 5px;
  cursor: pointer;
`;
const ButtonText = styled.p`
  color: white;
  font-size: 18px;
  text-align: center;
  &.text {
    color: #000000;
    &:hover {
      color: #818181;
    }
  }
`;
