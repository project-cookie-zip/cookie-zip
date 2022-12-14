import styled from "styled-components";
import MyVideoItem from "./MyVideoItem";
import axios from "axios";
import { useQuery } from "react-query";

export const MyVideoList = () => {
  const getMyVideos = async () => {
    const { data } = await axios.get(`/api/videos/me`);
    return data?.videos;
  };

  const Videos = useQuery({
    queryKey: ["getMyVideos"],
    queryFn: getMyVideos,
  });

  console.log("Videos", Videos?.data);
  return (
    <STMyVideoListContainer>
      {Videos?.data?.map((item: any) => (
        <MyVideoItem myVideos={item} key={item.id} />
      ))}
    </STMyVideoListContainer>
  );
};

const STMyVideoListContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 80px;
`;
