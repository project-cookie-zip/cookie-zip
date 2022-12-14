import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Swal from "sweetalert2";
import axios from "axios";
import Router from "next/router";
import { LoadingSpinner } from "src/components/videos/video/LoadingSpinner";
import { videoAPI } from "src/shared/api";

export default function AddPost() {
  // 동영상 처리
  const [mediaView, setMediaView] = useState("");
  const [testSend, setTestSend] = useState("");

  const uploadFile = (file: any) => {
    let maxSize = 200 * 1024 * 1024;
    let fileSize = file.size;
    if (fileSize > maxSize) {
      Swal.fire({
        title: "업로드할 동영상은 200mb 이하로 선택해주세요",
        icon: "warning",
        confirmButtonColor: "#A9653B",
        confirmButtonText: "알겠어용",
        width: "80vw",
      }).then(result => {
        if (result.value) {
        }
      });
    } else {
      const videourl = URL.createObjectURL(file);
      setMediaView(videourl);
      setTestSend(file);
    }
  };

  // delete video file and view
  const deleteVideo = () => {
    setMediaView("");
    setTestSend("");
  };

  // title value
  const [title, setTitle] = useState<string>("");
  // textarea value
  const [content, setContent] = useState<string>("");
  // textarea 자동 줄바꿈
  const [textareaHeight, setTextareaHeight] = useState<number>(1);
  // console.log(content);
  const onKeyEnter = (e: any) => {
    if (e.key === "Enter" && content.length < 130) {
      setContent(content + "\n");
    }
  };
  useEffect(() => {
    setTextareaHeight(content.split("\n").length);
  }, [content]);

  // category value - 현재 미구현
  const [category, setCategory] = useState("");

  const videoPostApi = async () => {
    let formData = new FormData();
    formData.append("file", testSend);
    const {
      data: { uploadURL, uid },
    } = await videoAPI.getCloudVideo();
    await axios.post(uploadURL, formData).then(res => console.log(res));

    const {
      result: { thumbnail, preview },
    } = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_CLIENT_ID}/stream/${uid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      )
    ).json();

    await videoAPI.postVideo({
      title,
      description: content,
      videoUrl: preview,
      thumbnailUrl: thumbnail,
    });
    // stop uploading
    setNowUploading(false);

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "저장 완료!",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      width: "80vw",
    });
    Router.push("/");
  };

  // isLoading
  const [nowUploading, setNowUploading] = useState(false);

  const addVideo = async () => {
    setNowUploading(true);
    if (title === "" || testSend === "" || content === "") {
      Swal.fire({
        title: "글을 확인해주세요ㅠㅠ",
        icon: "warning",
        confirmButtonColor: "#A9653B",
        confirmButtonText: "네, 알겠어요",
        width: "80vw",
      }).then(result => {
        if (result.value) {
          setNowUploading(false);
        }
      });
    } else {
      Swal.fire({
        title: "저장할까요?",
        icon: "question",
        confirmButtonColor: "#A9653B",
        confirmButtonText: "넹",
        width: "80vw",
      }).then(result => {
        if (result.value) {
          videoPostApi();
        }
      });
    }
  };

  const cancleVideo = () => {
    Swal.fire({
      title: "정말 취소할까요?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#A9653B",
      confirmButtonText: "취소할래요",
      cancelButtonColor: "#d4b29e",
      cancelButtonText: "마저 작성할게요",
      width: "80vw",
    }).then(result => {
      if (result.value) {
        Router.push("/");
      }
    });
  };

  return (
    <FormContainer>
      {nowUploading ? <LoadingSpinner /> : null}
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
        <CateSelect
          name="category"
          id="category"
          defaultValue={0}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCategory(e.target.value)
          }
        >
          <option value="0" disabled>
            카테고리
          </option>
          <option value="1">게임</option>
          <option value="2">음악</option>
          <option value="3">요리</option>
          <option value="4">쇼핑</option>
          <option value="5">스포츠</option>
          <option value="6">동물</option>
          <option value="7">연예</option>
          <option value="8">뷰티</option>
          <option value="9">영화</option>
          <option value="10">먹방</option>
        </CateSelect>
      </ContentsWrap>
      <ButtonWrap>
        <button onClick={addVideo} type="button">
          업로드
        </button>
        <button className="cancel" type="button" onClick={cancleVideo}>
          취소
        </button>
      </ButtonWrap>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 480px;
  height: 950px;

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
  margin-top: 58px;
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
  color: white;
  font-weight: bold;
  background-color: #a9653b;
  position: relative;
  left: 35vw;
  transition: 0.3s;

  &:active {
    background-color: #664029;
  }
`;

const ContentsWrap = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 90vw;

  & span {
    font-size: 16px;
    color: ${props => props.theme.mainFontColor};
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
    color: ${props => props.theme.subFontColor};
  }
`;

const CateSelect = styled.select`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 80px;
  height: 25px;
  text-align: center;
  border: 1px solid #a9653b;
  border-radius: 5px;
  font-weight: bold;
  & option {
    font-weight: bold;
  }
`;

const ButtonWrap = styled.div`
  & button {
    margin: 0 10px 0 10px;
    border: none;
    border-radius: 5px;
    width: 60px;
    height: 30px;
    font-weight: bold;
    background-color: #a9653b;
    transition: 0.3s;
    &:active {
      background-color: #df9e75;
    }
  }
  & button:first-child {
    color: white;
  }
  & .cancel {
    border: 1px solid #a9653b;
    background-color: ${props => props.theme.cancelBtnBackground};
    color: ${props => props.theme.cancelBtnFontColor};
  }
`;
