import { useQuery } from "react-query";
import { myAPI } from "src/shared/api";

export const useMyData = () => {
  const myData = async () => {
    // const response = await axios.get("/api/users/me");
    const response = await myAPI.getMyData();
    return response.data;
  };
  const query = useQuery("getMyData", myData, {
    refetchOnWindowFocus: false,
  });
  return query;
};
