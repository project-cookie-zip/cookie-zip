import { useState, useEffect } from "react";
import { myAPI } from "src/shared/api";

export const useLoginCheck = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const loginData = async () => {
    const response = await myAPI
      .getMyData()
      .then(response => {
        setIsLogin(response.data.ok ? true : false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    loginData();
    // dark mode
    localStorage.getItem("cookie-dark") === null
      ? localStorage.setItem("cookie-dark", "false")
      : null;
  }, []);

  return isLogin ? true : false;
};
