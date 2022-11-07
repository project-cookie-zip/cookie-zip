import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { useState,useEffect } from "react";
import { darkTheme, lightTheme } from "../src/theme";

export default function App({ Component, pageProps }: AppProps) {
  const [isDark, setIsDark] = useState(false);


  
  return (
    <RecoilRoot>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}
