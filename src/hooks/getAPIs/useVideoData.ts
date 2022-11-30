import axios from "axios";
import { useQuery } from "react-query";

// video 단일 페이지 데이터 get
export const useVideoData = ({ query }: any) => {
  const getVideoData = async () => {
    const data = await axios.get(`/api/videos/${query}`);
    return data?.data.video;
  };
  const { data, isError, isLoading } = useQuery("getVideoData", getVideoData, {
    refetchOnWindowFocus: false,
  });

  return data;
};
