import { ListItems } from "./ListItems";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

export const List = () => {
  const getVideos = async () => {
    const { data } = await axios.get(`/api/videos`);
    return data?.videos;
  };

  const { data } = useQuery({
    queryKey: ["getVideos"],
    queryFn: getVideos,
  });

  // console.log("data", data);

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
