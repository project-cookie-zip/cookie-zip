import { useState, useEffect } from "react";

export const useLocalStorage = (key: string, init: boolean) => {
  const [isDark, setIsDark] = useState<any>(
    // localStorage.getItem(key) === "true" ? true : false || init,
    false,
  );

  useEffect(() => {
    if (isDark) {
      localStorage.setItem("cookie-dark", "true");
    } else {
      localStorage.setItem("cookie-dark", "false");
    }
  }, [key, isDark]);
  return [isDark, setIsDark];
};
