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
    setError,
    formState: { errors },
  } = useForm<IFormInputs>();
  // console.log(errors);

  const router = useRouter();

  const getValues = (data: IFormInputs) => {
    if (data?.password !== data?.password2) {
      setError(
        "password2",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true },
      );
      console.log(data.password);
    }
  };
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
      Swal.fire("중복된 아이디입니다");
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
            {...register("email", {
              required: true,
              pattern: {
                value:
                  /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                message: "이메일 형식을 지켜주세요",
              },
            })}
          />
          <ErrorsMessage>
            {errors.email?.type === "required" && "이메일을 입력해주세요"}
            {errors.email?.type === "pattern" && errors.email.message}
          </ErrorsMessage>
        </Div>
        <Div>
          <Text>닉네임</Text>
          <Input
            {...register("nickname", {
              required: "닉네임을 작성해주세요",
              maxLength: {
                value: 10,
                message: "10자 이내로 작성하세요 ",
              },
            })}
          />
          <ErrorsMessage>
            {errors.nickname?.type === "required" && "닉네임을 작성해주세요"}
            {errors.nickname?.type === "maxLength" && errors.nickname.message}
          </ErrorsMessage>
        </Div>
        <Div>
          <Text>비밀번호</Text>
          <Input
            type={passwordType.type}
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message:
                  "비밀번호는 숫자, 영문 대문자, 소문자, 특수문자를 포함한 8글자 이상이어야 합니다.",
              },
              pattern: {
                value:
                  /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8}$/,
                message:
                  "비밀번호는 숫자, 영문 대문자, 소문자, 특수문자를 포함한 8글자 이상이어야 합니다 ",
              },
            })}
          />
          <ErrorsMessage>
            {errors.password?.type === "required" && "비밀번호를 입력해주세요"}
            {errors.password?.type === "minLength" &&
              "pattern" &&
              errors.password.message}
          </ErrorsMessage>
        </Div>
        <Div>
          <Text>비밀번호(확인)</Text>
          <Input
            type={passwordType.type}
            {...register("password2", {
              required: true,
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "비밀번호가 일치하지 않습니다.";
                }
              },
            })}
          />
          <ErrorsMessage>
            {errors.password2?.type === "required" &&
              "비밀번호를 한번 더 입력해주세요"}
            {errors.password2?.message}
          </ErrorsMessage>

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
const ErrorsMessage = styled.p`
  font-size: 13px;
  color: #6c5b44;
`;
