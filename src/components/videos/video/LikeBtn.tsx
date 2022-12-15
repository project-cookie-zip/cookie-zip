import styled from "styled-components";
import Image from "next/image";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState, useEffect } from "react";
import { useIsLiked } from "src/hooks/getAPIs/useIsLiked";
import { videoAPI } from "src/shared/api";

export const LikeBtn = ({ likeCount, pageQuery, videoState }: any) => {
  const [isLiked, setisLiked] = useState<boolean>(false);

  // isLiked data fetch
  const likedData = useIsLiked();
  useEffect(() => {
    setisLiked(likedData);
  }, [likedData]);

  // like 처리 API
  const likesAPI = async () => {
    const likeUpdate = await videoAPI.postLikeReq(pageQuery);
  };

  const likeMutation = useMutation(likesAPI);

  // likes
  const [optiCount, setOptiCount] = useState<number>(likeCount);
  const likeUp = () => {
    if (isLiked) {
      setisLiked(false);
      setOptiCount(optiCount - 1);
    } else {
      setisLiked(true);
      setOptiCount(optiCount + 1);
    }
    likeMutation.mutate();
  };

  return (
    <LikesBtns>
      <button onClick={() => likeUp()}>
        <Image
          src={
            isLiked
              ? require("../../../images/cookieLiked.png")
              : require("../../../images/cookieUnLiked.png")
          }
          alt="좋아요"
          width={40}
        />
      </button>
      <span>{optiCount}</span>
    </LikesBtns>
  );
};

const LikesBtns = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;

  & button {
    border: none;
    background: none;
    border-radius: 15px;

    &:active {
      background-color: #ececec;
    }
  }
`;
