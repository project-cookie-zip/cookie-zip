import styled from "styled-components";

export const ListItems = () => {
  return (
    <STContainer>
      <STVideoBox>
        <STImage
          src="https://i.ytimg.com/vi/xg7yuvI0iTw/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhlIE0oSTAP&rs=AOn4CLC7pdHY8BpWntmg15mfwdVSKeRmoQ"
          alt="썸네일"
        />
      </STVideoBox>
      <STContentBox>
        <STChannelName>채널명</STChannelName>
        <STContent>
          <div>영상제목입니다아아아아아아</div>
          <div>
            <span>작성자 ∙ 조회수 12만회 ∙ N일전</span>
          </div>
        </STContent>
      </STContentBox>
    </STContainer>
  );
};

const STContainer = styled.div`
  border: 1px solid #754423;
  display: flex;
  flex-direction: column;
  width: 480px;
  height: 310px;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const STVideoBox = styled.div`
  border-bottom: 1px solid #754423;
  height: 240px;
  width: 480px;
`;

const STImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const STContentBox = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  & span {
    font-size: 13px;
    color: gray;
  }
`;

const STChannelName = styled.div`
  border-radius: 50%;
  font-size: 16px;
  text-align: center;
  line-height: 50px;
  background-color: #c97f4ebb;
  width: 50px;
  height: 50px;
  margin: 0 10px;
`;
const STContent = styled.div`
  display: flex;
  flex-direction: column;
`;
