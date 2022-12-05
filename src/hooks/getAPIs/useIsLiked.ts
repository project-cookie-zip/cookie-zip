import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useIsLiked = () => {
  const { query } = useRouter();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const getLiked = async () => {
    const data = await axios
      .get(`/api/videos/${query.id}`)
      .then(res => {
        // console.log(res.data.isLike);
        setIsLiked(res.data.isLike);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (query.id !== undefined) {
      getLiked();
    }
  }, [query]);
  return isLiked;
};
