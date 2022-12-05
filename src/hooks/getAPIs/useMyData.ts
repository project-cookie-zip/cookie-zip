import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";

export const useMyData = () => {
  const myData = async () => {
    const response = await axios.get("/api/users/me");
    return response.data;
  };
  const query = useQuery("getMyData", myData, {
    refetchOnWindowFocus: false,
  });
  return query;
};
