import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { text } from "stream/consumers";

export default function Add() {
  // 동영상 처리
  const [mediaView, setMediaView] = useState("");

  const uploadFile = (file: any) => {
    const videourl = URL.createObjectURL(file);
    setMediaView(videourl);
    // const fileReader = new FileReader();
    // fileReader.readAsDataURL(file);
    // fileReader.onload = () => {
    //   const fileType = file.type.split("/")[0]
  };

  const deleteVideo = () => {
    setMediaView("");
  };

  // title value
  const [title, setTitle] = useState<string>("");
  // textarea value
  const [content, setContent] = useState<string>("");
  // textarea 자동 줄바꿈
  const [textareaHeight, setTextareaHeight] = useState(1);
  console.log(content);
  const onKeyEnter = (e: any) => {
    if (e.key === "Enter" && content.length < 130) {
      setContent(content + "\n");
    }
  };

  useEffect(() => {
    setTextareaHeight(content.split("\n").length);
  }, [content]);

  return (
    <FormContainer>
      <VideoWrap>
        <VideoView
          style={mediaView === "" ? { display: "none" } : { display: "block" }}
          src={mediaView}
          controls
        ></VideoView>
        <UploadLabel
          htmlFor="uploadFile"
          style={mediaView !== "" ? { display: "none" } : { display: "flex" }}
        >
          <Image
            src={require("../../src/images/cookieUploader.png")}
            alt="https://icons8.com/icon/WLubF9R6RUtV/upload-to-cloud Upload to Cloud icon by https://icons8.com Icons8"
          />
          <p>Upload Your Video!</p>
        </UploadLabel>
        <input
          style={{ display: "none" }}
          id="uploadFile"
          type="file"
          accept="video/mp4,video/mkv, video/x-m4v,video/*"
          onChange={(e: any) => {
            // React.event -- type 공부예정
            uploadFile(e.target.files[0]);
          }}
        />
      </VideoWrap>
      <CancelBtn type="button" onClick={deleteVideo}>
        지우기
      </CancelBtn>
      <ContentsWrap>
        <span>제목</span>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          type="text"
          placeholder="제목을 입력해주세요"
          maxLength={20}
        />
        <p>{title.length}/20</p>
        <span>내용</span>
        <textarea
          autoComplete="off"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setContent(e.target.value);
          }}
          onKeyDown={onKeyEnter}
          rows={textareaHeight}
          placeholder="내용을 입력해주세요"
          maxLength={130}
        />
        <p>{content.length}/130</p>
      </ContentsWrap>
      <ButtonWrap>
        <button type="button">업로드</button>
        <Link href={"/"}>
          <button className="cancel" type="button">
            취소
          </button>
        </Link>
      </ButtonWrap>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: addPostFadein 0.8s;
  @keyframes addPostFadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const VideoWrap = styled.div`
  width: 90vw;
  height: 300px;
`;

const UploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90vw;
  height: 300px;
  border: 1px solid #a9653b;
  border-radius: 15px;

  & img {
    width: 20vw;
    height: 10vh;
  }
  & p {
    font-size: 25px;
    color: #a9653b;
  }
`;

const VideoView = styled.video`
  width: 90vw;
  height: 300px;
`;

const CancelBtn = styled.button`
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  width: 60px;
  height: 30px;
  background-color: #a9653b;
  position: relative;
  left: 35vw;
  transition: 0.3s;

  &:active {
    background-color: #664029;
  }
`;

const ContentsWrap = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 90vw;

  & span {
    font-size: 16px;
  }
  & input {
    height: 45px;
    font-size: 18px;
    border: none;
    border-bottom: 1px solid #a9653b;
    transition: 0.2s;

    &:focus {
      outline: none;
      border-bottom: 3px solid #a9653b;
    }
  }
  & textarea {
    resize: none;
    overflow-wrap: break-word;
    overflow: hidden;
    word-break: break-all;
    white-space: pre-wrap;

    height: 125px;
    font-size: 18px;
    border: none;
    border-bottom: 1px solid #a9653b;
    transition: 0.2s;

    &:focus {
      outline: none;
      border-bottom: 3px solid #a9653b;
    }
  }
  & p {
    margin: 0;
    margin-top: 5px;
    margin-bottom: 15px;
    text-align: right;
  }
`;

const ButtonWrap = styled.div`
  & button {
    margin: 0 10px 0 10px;
    border: none;
    border-radius: 5px;
    width: 60px;
    height: 30px;
    background-color: #a9653b;
    transition: 0.3s;
    &:active {
      background-color: #df9e75;
    }
  }
  & .cancel {
    background-color: transparent;
    border: 1px solid #a9653b;
  }
`;
