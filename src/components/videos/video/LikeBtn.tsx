import styled from "styled-components";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import axios from "axios";

export const LikeBtn = ({ likeCount, pageQuery }: any) => {
  const queryClient = useQueryClient();
  const [isLiked, setisLiked] = useState<boolean>(false);
  console.log(isLiked);

  // 쿼리데이터
  const apiTest = async () => {
    const data = await axios.get(`/api/videos/${pageQuery}`);
    return data?.data.video;
  };

  const { data, isError, isLoading } = useQuery("getVideoData", apiTest);
  console.log("라이크쿼리", data);
  console.log("like query like num", data._count.likes);

  // like 처리 API
  const likesAPI = async () => {
    const data = await axios.post(`/api/videos/${pageQuery}/fav`);
    console.log(data);
  };

  // like mutate
  const mutation = useMutation(likesAPI, {
    onMutate: async () => {
      // 연산 영향 쿼리 정지
      await queryClient.cancelQueries("getVideoData");
      // 기존데이터 저장
      const prevData = queryClient.getQueryData("getVideoData");
      // 업데이트 반영 캐시 수줭
      queryClient.setQueryData("getVideoData", prev => {
        if (prev) {
          return {
            ...prev,
            count: {
              likes: data._count.likes + 1,
              comments: data._count.comments,
            },
          };
        }
        // return prev // 다중데이터시 prev props => 다음 map 후 처리 가능
      });
    },
    onSettled: () => queryClient.invalidateQueries("getVideoData"), //끝나고 나면 데이터를 업데이트 시킨다
    onSuccess: () => {
      queryClient.invalidateQueries("getVideoData");
    },
  });

  // likes
  const likeUp = () => {
    console.log("좋아용");
    isLiked ? setisLiked(false) : setisLiked(true);
    mutation.mutate();
  };

  return (
    <LikesBtns>
      <button onClick={() => likeUp()}>
        <Image
          src={require("../../../images/cookieLike.png")}
          alt="좋아요"
          width={40}
        />
      </button>
      <span>{likeCount}</span>
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
    /* width: 40px;
    height: 40px; */

    &:active {
      background-color: #ececec;
    }
  }
`;
