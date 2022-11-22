import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";

import { CommentModal } from "./CommentModal";

export const Accordion = ({
  baseImage,
  videoState,
}: {
  baseImage: string;
  videoState: any;
}) => {
  const closeDetailse = () => {
    console.log("댓글닫기");
    const details = document.querySelector("details");
    details?.removeAttribute("open");
  };
  console.log("프롭스", videoState);
  // add comment modal
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <AcodianWrap>
      <CommentsLine>
        <summary>댓글보기</summary>
        <CommentsLineTop>
          <span>댓글</span>
          <span onClick={closeDetailse}>X</span>
        </CommentsLineTop>
        <p>댓글을 사용할 때는 타인을 존중해주세요</p>
        <AddComment>
          <Image
            src={baseImage}
            alt="프로필사진"
            width={60}
            height={60}
            unoptimized={true}
          />
          <span onClick={openModal}>댓글 추가 ...</span>
        </AddComment>
        <CommentModal showModal={showModal} closeModal={closeModal} />
        <CommentsWrap>댓글들이 여기 달릴거에요</CommentsWrap>
      </CommentsLine>
    </AcodianWrap>
  );
};

const AcodianWrap = styled.div`
  border-top: 1px solid #e5e8eb;
  border-bottom: 1px solid #e5e8eb;
  padding: 20px 0;
  width: 95vw;

  display: flex;
`;

const CommentsLine = styled.details`
  // base css
  width: 100vw;

  & summary {
  }

  // toggle mark css
  & summary::marker {
    content: "";
  }
  &[open] summary {
    display: none;
  }
  & summary:before {
  }

  // toggle keyFrame
  & summary ~ * {
    animation: closeComments 0.6s;
    @keyframes closeComments {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  }
  &[open] summary ~ * {
    animation: opneComments 0.6s;
    @keyframes opneComments {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const CommentsLineTop = styled.div`
  padding: 5px;
  margin-bottom: 15px;
  width: 90vw;
  display: flex;
  justify-content: space-between;

  & span {
    font-size: 22px;
  }
`;

const AddComment = styled.div`
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  & img {
    margin-right: 10px;
  }
  & span {
    color: gray;
    font-size: 14px;
  }
`;

const CommentsWrap = styled.div`
  /* border-bottom: 1px solid #e5e8eb; */
`;
