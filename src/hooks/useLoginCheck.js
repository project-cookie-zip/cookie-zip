import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export const useLoginCheck = () => {
  //   const { pathname } = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  const loginData = async () => {
    const response = await axios
      .get("/api/users/me")
      .then(response => {
        // console.log(response.data.ok);
        setIsLogin(response.data.ok ? true : false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    loginData();
  }, []);
  //   pathname

  return isLogin ? true : false;
};
