import { useState, useEffect } from "react";
import axios from "axios";

export const useLoginCheck = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const loginData = async () => {
    const response = await axios
      .get("/api/users/me")
      .then(response => {
        setIsLogin(response.data.ok ? true : false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    loginData();
    localStorage.getItem("cookie-dark") === null
      ? localStorage.setItem("cookie-dark", "false")
      : null;
  }, []);

  return isLogin ? true : false;
};
