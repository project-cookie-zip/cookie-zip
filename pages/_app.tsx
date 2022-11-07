import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { darkTheme, lightTheme } from "../src/theme";
import { Layout } from "../src/components/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const [isDark, setIsDark] = useState(false);

  return (
    <RecoilRoot>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </RecoilRoot>
  );
}
