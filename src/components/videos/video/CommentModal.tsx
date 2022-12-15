import styled from "styled-components";
import Image from "next/image";
import { QueryClient, useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { commentAPI } from "src/shared/api";

interface ICommentRequest {
  content: string;
}

export const CommentModal = ({
  showModal,
  closeModal,
}: {
  showModal: () => void;
  closeModal: () => void;
}) => {
  const baseImage = `https://source.boringavatars.com/beam/110/$1?colors=DF9E75,A9653B,412513,412510,412500`;
  const {
    query: { id },
  } = useRouter();

  const [content, setContent] = useState("");
  const onChangeContentHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(e.target.value);
  };
  const queryClient = new QueryClient();

  const addWrite = async (req: any) => {
    const response = await commentAPI.postComment(id, req);
    return response;
  };

  const { mutate } = useMutation<any, AxiosError, ICommentRequest>(
    req => addWrite(req),
    {
      onError: error => console.log(error),
      onSuccess: () => {
        queryClient.invalidateQueries(["content"]);
      },
    },
  );

  const onClick = () => {
    setContent("");
    mutate(
      { content },
      {
        onSuccess: () => {
          setTimeout(() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              left: 100,
              behavior: "smooth",
            });
          }, 500);
        },
        onError: () => {},
      },
    );
  };
  return (
    <StyledModalBackground
      onClick={closeModal}
      style={showModal ? { display: "block" } : { display: "none" }}
    >
      <StyledModalContainer onClick={e => e.stopPropagation()}>
        <StyledModal>
          <Image
            src={baseImage}
            alt="프로필사진"
            width={60}
            height={60}
            unoptimized={true}
          />
          <textarea
            onChange={onChangeContentHandler}
            placeholder="댓글추가 ..."
          />
          <SendCommentBtn>
            <Image
              onClick={onClick}
              src={require("../../../images/cookieSend.png")}
              alt="https://icons8.com/icon/s3wZZp6L8B9s/send Send icon by https://icons8.com"
            />
          </SendCommentBtn>
        </StyledModal>
      </StyledModalContainer>
    </StyledModalBackground>
  );
};

const StyledModalContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 10px;
  transform: translate(-50%, -50%);
`;

const StyledModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 0;
  cursor: auto;
  display: flex;
`;

const StyledModal = styled.div`
  width: 100vw;
  height: 80px;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    width: 60px;
    height: 60px;
    padding: 5px;
    margin-right: 5px;
  }
  & textarea {
    width: 80vw;
    height: 40px;
    resize: none;
    border: none;
    font-size: 20px;
    font-weight: bold;
  }
`;

const SendCommentBtn = styled.button`
  background: none;
  border: none;
  border-radius: 10px;
  & img {
    width: 40px;
    height: 40px;
  }
  &:active {
    background-color: #dfdfdf;
  }
`;
