import { useQuery } from "react-query";
import { videoAPI } from "src/shared/api";

// query 파라미터때문에 훅으로 만들면 너무 느려짐
// react query 재확인 후 적용 검토 예정

// ServerSideProps로 변경

// video 단일 페이지 데이터 get
export const useVideoData = ({ query }: any) => {
  const getVideoData = async () => {
    const data = await videoAPI.getEachVideo(`${query}`);
    return data?.data.video;
  };
  const { data, isError, isLoading } = useQuery("getVideoData", getVideoData, {
    refetchOnWindowFocus: false,
  });

  return { data, isError, isLoading };
};
