import { ListItems } from "./ListItems";
import styled from "styled-components";
import { useQuery } from "react-query";
import { videoAPI } from "src/shared/api";

export const List = () => {
  const getVideos = async () => {
    const { data } = await videoAPI.getVideos();
    return data?.videos;
  };

  const { data } = useQuery("getVideos", getVideos, {
    refetchOnWindowFocus: false,
  });

  return (
    <STListContainer>
      <ListItems listdata={data} />
    </STListContainer>
  );
};

const STListContainer = styled.div`
  padding-top: 130px;
  padding-bottom: 60px;
  height: 100%;
  transition: 0.3s;
  background-color: ${props => props.theme.backgroundColor};
`;
