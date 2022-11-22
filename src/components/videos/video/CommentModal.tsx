import styled from "styled-components";
import Image from "next/image";

export const CommentModal = ({
  showModal,
  closeModal,
}: {
  showModal: any;
  closeModal: any;
}) => {
  const baseImage = `https://source.boringavatars.com/beam/110/$1?colors=DF9E75,A9653B,412513,412510,412500`;

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
          <textarea placeholder="댓글추가 ..." />
          <SendCommentBtn>
            <Image
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
