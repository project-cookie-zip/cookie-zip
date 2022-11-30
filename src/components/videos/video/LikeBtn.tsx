import styled from "styled-components";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import { useIsLiked } from "src/hooks/getAPIs/useIsLiked";

export const LikeBtn = ({ likeCount, pageQuery, videoState }: any) => {
  const queryClient = useQueryClient();
  const [isLiked, setisLiked] = useState<boolean>(false);
  console.log(isLiked);

  // isLiked data fetch
  const likedData = useIsLiked();
  useEffect(() => {
    setisLiked(likedData);
  }, [likedData]);

  // like 처리 API
  const likesAPI = async () => {
    const likeUpdate = await axios.post(`/api/videos/${pageQuery}/fav`);
  };

  const likeMutation = useMutation(likesAPI);

  // like mutate
  // const mutation = useMutation(likesAPI, {
  //   onMutate: async () => {
  //     // 연산 영향 쿼리 정지
  //     await queryClient.cancelQueries("getVideoData");
  //     // 기존데이터 저장
  //     const prevData = queryClient.getQueryData("getVideoData");
  //     // 업데이트 반영 캐시 수줭
  //     queryClient.setQueryData("getVideoData", prev => {
  //       if (prev) {
  //         return {
  //           ...prev,
  //           count: {
  //             likes: videoState._count.likes + 1,
  //             comments: videoState._count.comments,
  //           },
  //         };
  //       }
  //       // return prev // 다중데이터시 prev props => 다음 map 후 처리 가능
  //     });
  //   },
  //   onSuccess: () => {
  //     // queryClient.invalidateQueries("getVideoData");
  //   },
  //   // onSettled: () => queryClient.invalidateQueries("getVideoData"), //끝나고 나면 데이터를 업데이트 시킨다
  //   // invalidateQueryies로 데이터 패칭을 해주려 했으나,
  //   // videos Data get 요청시마다 조회수 상승하는 문제로 주석처리
  //   // 수정 예정
  // });

  // likes
  const [optiCount, setOptiCount] = useState<number>(likeCount);
  const likeUp = () => {
    console.log("좋아용");
    if (isLiked) {
      setisLiked(false);
      setOptiCount(optiCount - 1);
    } else {
      setisLiked(true);
      setOptiCount(optiCount + 1);
    }
    // mutation.mutate();
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
    /* width: 40px;
    height: 40px; */

    &:active {
      background-color: #ececec;
    }
  }
`;
