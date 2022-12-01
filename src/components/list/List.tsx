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

  console.log("data", data);

  return (
    <STListContainer>
      <ListItems listdata={data} />
    </STListContainer>
  );
};

const STListContainer = styled.div`
  margin-top: 110px;
  margin-bottom: 80px;
`;
