import styled from "styled-components";
import MyVideoItem from "./MyVideoItem";
import axios from "axios";
import { useQuery } from "react-query";

export const MyVideoList = ({ myInfo }: any): JSX.Element => {
  // console.log("myInfo", myInfo);

  const getVideos = async () => {
    const { data } = await axios.get(`/api/videos`);
    return data?.videos;
  };

  const totalVideos = useQuery({
    queryKey: ["getVideos"],
    queryFn: getVideos,
  });

  console.log("totalVideos", totalVideos?.data);
  const myVideos = totalVideos?.data.filter(
    (el: any) => el.userId === myInfo?.id,
  );
  // console.log("myVideos", myVideos);
  return (
    <STMyVideoListContainer>
      {myVideos?.map((item: any) => (
        <MyVideoItem myVideos={item} key={item.id} />
      ))}
    </STMyVideoListContainer>
  );
};

const STMyVideoListContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 80px;
`;
