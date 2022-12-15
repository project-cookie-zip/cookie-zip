import Link from "next/link";
import styled from "styled-components";
import { TimeToToday } from "@utils/client/timeToToday";
import Image from "next/image";
import { baseImageData } from "@utils/client/baseImage";

export const ListItems = ({ listdata }: any): JSX.Element => {
  return (
    <>
      {listdata?.map((el: any) => (
        <STContainer key={el.id}>
          <Link href={`/videos/${el.id}`}>
            <STVideoBox>
              <STImage src={el?.thumbnailUrl} alt="썸네일" />
            </STVideoBox>
          </Link>
          <STContentBox>
            <Image
              // src={el?.user.avatar ? el?.avatar : baseImageData(el.userId)}
              src={baseImageData(el.userId)}
              alt="프로필사진"
              width={50}
              height={50}
              unoptimized={true}
            />
            <STContent>
              <STTitle>{el?.title}</STTitle>
              <div>
                <span>
                  {el?.user?.name} ∙ 조회수 {el?.views} ∙{" "}
                  {TimeToToday(new Date(el?.createdAt))}
                </span>
              </div>
            </STContent>
          </STContentBox>
        </STContainer>
      ))}
    </>
  );
};

const STContainer = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  display: flex;
  flex-direction: column;
  width: 460px;
  height: 310px;
  margin: 0 auto;
  margin-bottom: 40px;
  transition: 0.3s;
  box-shadow: ${props => props.theme.boxShadow};
`;

const STVideoBox = styled.div`
  border-bottom: 1px solid #754423;
  height: 240px;
  width: 100%;
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
  & img {
    margin: 10px;
  }
`;

const STContent = styled.div`
  display: flex;
  flex-direction: column;
  & span {
    transition: 0.3s;
    color: ${props => props.theme.subFontColor};
  }
`;

const STTitle = styled.div`
  transition: 0.3s;
  color: ${props => props.theme.mainFontColor};
`;
