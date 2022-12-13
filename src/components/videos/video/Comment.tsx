import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import IconButton from "@mui/material/IconButton";
import { IComment } from "./Accordion";

interface ICommentProps {
  comments: IComment;
  baseImage: string;
}

const Comment = ({ comments, baseImage }: ICommentProps) => {
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  // 모달창 노출
  const showModal = () => {
    setModalOpen(props => !props);
  };
  return (
    <div>
      <CommentsWrap key={comments.id}>
        <Image
          src={baseImage}
          alt="프로필사진"
          width={60}
          height={60}
          unoptimized={true}
        />
        <Div
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <ContentWrap>{comments.content} </ContentWrap>

          <IconButton onClick={showModal} aria-label="Example">
            <Container modalOpen={modalOpen}></Container>
            <Icon $isHover={isHover} icon={faEllipsisV} />
          </IconButton>
        </Div>
      </CommentsWrap>
    </div>
  );
};

export default Comment;
const CommentsWrap = styled.div`
  display: flex;
  padding: 15px;
  align-items: center;
`;
const ContentWrap = styled.div`
  margin-left: 10px;
`;
const Div = styled.div`
  display: flex;
  justify-content: space-between;
  width: 92%;
  align-items: center;
`;
const Container = styled.div<{ modalOpen: boolean }>`
  display: ${props => (props.modalOpen ? "auto" : "none")};
  width: 100px;
  height: 80px;
  position: absolute;
  transform: translate(60%, 5%);
  background-color: #ffffff;
  border: 2px solid ${props => props.theme.borderColor};
  border-radius: 8px;
  z-index: 30;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border: none;
`;

const Icon = styled(FontAwesomeIcon)<{ $isHover: boolean }>`
  display: ${props => (props.$isHover ? "auto" : "none")};
`;
