import { ListItems } from "./ListItems";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

export const List = () => {
  const [videoList, setVideoList] = useState();

  const getVideo = async () => {
    const { data } = await axios.get(`/api/videos`);

    console.log(data);
  };
  useEffect(() => {
    getVideo();
  }, []);

  return (
    <STListContainer>
      <ListItems />
      <ListItems />
      <ListItems />
    </STListContainer>
  );
};

const STListContainer = styled.div`
  margin-top: 110px;
  margin-bottom: 80px;
`;
