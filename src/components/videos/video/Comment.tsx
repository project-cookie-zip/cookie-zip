import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverRounded";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import { IComment } from "./Accordion";
import { commentAPI } from "src/shared/api";
import Swal from "sweetalert2";
import { useMyData } from "src/hooks/getAPIs/useMyData";

interface ICommentProps {
  comment: IComment;
  userName: string;
  userImage: string;
  baseImage: string;
  setComments: any;
}

const Comment = ({
  comment,
  userName,
  baseImage,
  userImage,
  setComments,
}: ICommentProps) => {
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(props => !props);
  };

  const id: any = comment.id;

  const onDelete = async () => {
    const response: any = await commentAPI
      .deleteComment(id)
      .catch(e => Swal.fire("삭제가 안됐습니다"));
    if (response?.data?.ok) {
      setComments((props: IComment[]) =>
        props.filter(comment => comment.id !== id),
      );
      return;
    }
  };

  const editHandler = () => {
    Swal.fire("준비중입니다");
  };

  const { data } = useMyData();
  const myId = data?.profile.id;

  return (
    <Wrapper>
      <CommentsWrap key={comment.id}>
        <Image
          src={userImage || baseImage}
          alt="프로필사진"
          width={60}
          height={60}
          unoptimized={true}
        />

        <Div
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div>
            <NickName>{userName}</NickName>
            <ContentWrap>{comment.content} </ContentWrap>
          </div>
          {myId === comment.user.id && (
            <IconContainer onClick={showModal}>
              <Icon $isHover={isHover} icon={faEllipsisV} />
            </IconContainer>
          )}
        </Div>
      </CommentsWrap>
      {modalOpen ? (
        <Container modalOpen={modalOpen}>
          <Buttons type="button" onClick={onDelete}>
            <DeleteForeverOutlinedIcon />
            삭제하기
          </Buttons>
          <Buttons type="button" onClick={editHandler}>
            <BuildCircleIcon />
            수정하기
          </Buttons>
        </Container>
      ) : null}
    </Wrapper>
  );
};

export default Comment;

const Wrapper = styled.div`
  position: relative;
`;
const NickName = styled.div`
  font-size: 14px;
  margin-left: 10px;
`;
const CommentsWrap = styled.div`
  display: flex;
  width: 95%;
  padding: 15px;
  align-items: center;
`;
const ContentWrap = styled.div`
  margin-left: 10px;
`;
const Div = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 92%;
  align-items: center;
`;
const Container = styled.div<{ modalOpen: boolean }>`
  position: absolute;
  right: 50px;
  top: -10px;
  width: 100px;
  height: 80px;
  background-color: #ffffff;
  border: 2px solid ${props => props.theme.borderColor};
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border: none;
`;
const Buttons = styled.button`
  display: flex;
  border-radius: 8px;
  width: 100%;
  height: 50%;
  font-size: 15px;
  border: none;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: #a5a5a5;
  }
`;
const Icon = styled(FontAwesomeIcon)<{ $isHover: boolean }>`
  display: ${props => (props.$isHover ? "auto" : "none")};
  width: 20px;
  height: 20px;
`;

const IconContainer = styled.div`
  width: 30px;
  height: 30px;
`;
