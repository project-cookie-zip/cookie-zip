import { useState, useEffect } from "react";

export const useLocalStorage = (key: string) => {
  const [isDark, setIsDark] = useState<any>(false);

  useEffect(() => {
    if (isDark) {
      localStorage.setItem("cookie-dark", "true");
    } else {
      localStorage.setItem("cookie-dark", "false");
    }
  }, [key, isDark]);
  return [isDark, setIsDark];
};
