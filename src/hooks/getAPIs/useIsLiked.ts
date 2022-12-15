import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { videoAPI } from "src/shared/api";
export const useIsLiked = () => {
  const { query } = useRouter();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const getLiked = async () => {
    const data = await videoAPI
      .getEachVideo(`${query.id}`)
      .then(res => {
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
