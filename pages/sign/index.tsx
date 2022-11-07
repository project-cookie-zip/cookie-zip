import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function SignUp() {
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
        <Text>닉네임</Text>
        <Input placeholder="닉네임을 입력하세요" />
      </Div>
      <Div>
        <Text>비밀번호</Text>
        <Input placeholder="비밀번호를 입력하세요" />
      </Div>
      <Div>
        <Text>비밀번호(확인)</Text>
        <Input placeholder="비밀번호를 입력하세요" />
      </Div>
      <ButtonDiv>
        <Button>
          <Link href="/login">
            <ButtonText>뒤로가기</ButtonText>
          </Link>
        </Button>
        <Button className="sign">
          <ButtonText>가입하기</ButtonText>
        </Button>
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
`;
const ButtonDiv = styled.div`
  margin: 40px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  & a {
    text-decoration: none;
  }
  margin: 40px 40px;
  height: 80px;
  width: 200px;
  background-color: #dea97e;
  border: solid;
  border-color: transparent;
  border-radius: 5px;
  &:hover {
    background-color: #c98d5c;
  }
  &.sign {
    background-color: #c6732f;
    &:hover {
      background-color: #875227;
    }
  }
`;
const ButtonText = styled.p`
  color: white;
  font-size: 18px;
  text-align: center;
`;
