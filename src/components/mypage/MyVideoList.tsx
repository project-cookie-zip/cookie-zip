import styled from "styled-components";
import MyVideoItem from "./MyVideoItem";
import axios from "axios";
import { useQuery } from "react-query";
import { myAPI } from "src/shared/api";

export const MyVideoList = () => {
  const getMyVideos = async () => {
    const { data } = await myAPI.getMyVideos();
    return data?.videos;
  };

  const Videos = useQuery("getMyVideos", getMyVideos, {
    refetchOnWindowFocus: false,
  });

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
  height: 100%;
  transition: 0.3s;
  background-color: ${props => props.theme.backgroundColor};
`;
