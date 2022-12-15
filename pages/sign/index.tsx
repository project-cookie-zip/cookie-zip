import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

interface IFormInputs {
  email: string;
  nickname: string;
  password: string;
  password2: string;
}
export default function SignUp() {
  const {
    register, // 등록
    handleSubmit, // 제출
    watch, // 현재 상태 볼 수있음
    formState: { errors },
  } = useForm<IFormInputs>();
  console.log(errors);

  const router = useRouter();

  const onSubmit = async (data: IFormInputs) => {
    const { ok } = await fetch("/api/users/enter", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (ok) {
      router.push("/login");
    } else {
      Swal.fire("뭐래 이자식이");
    }
  };

  // TODO : password type 변경용 state
  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: false,
  });
  const handlePasswordType = () => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };
  return (
    <div>
      <Logo>
        <Image src={require("../../src/images/thumbnail.png")} alt="알림" />
      </Logo>
      <Hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Div>
          <Text>이메일</Text>
          <Input
            {...register("email", { required: "이메일을 작성해 주세요" })}
          />
          <span>{errors?.email?.message}</span>
        </Div>
        <Div>
          <Text>닉네임</Text>
          <Input {...register("nickname")} />
        </Div>
        <Div>
          <Text>비밀번호</Text>
          <Input type={passwordType.type} {...register("password")} />
        </Div>
        <Div>
          <Text>비밀번호(확인)</Text>
          <Input type={passwordType.type} {...register("password2")} />
          <span onClick={handlePasswordType}>
            {passwordType.visible ? <span>숨기기</span> : <span>보이기</span>}
          </span>
        </Div>
        <ButtonDiv>
          <Button>
            <Link href="/login">
              <ButtonText>뒤로가기</ButtonText>
            </Link>
          </Button>
          <Button type="submit" className="sign">
            <ButtonText className="signtext">가입하기</ButtonText>
          </Button>
        </ButtonDiv>
      </form>
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
  padding: 20px;
  background-color: #9d6511;
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
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  &.signtext {
    color: #1e1e1e;
    font-weight: bold;
    font-family: "Work Sans", sans-serif;
    font-size: 16px;
  }
`;
