import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { darkTheme, lightTheme } from "../src/theme";
import { Layout } from "../src/components/layout/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { useLoading } from "src/hooks/useLoading";
import { LoadingSpinner } from "src/components/videos/video/LoadingSpinner";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  const [isDark, setIsDark] = useState<boolean>(false);
  const isLoading: boolean = useLoading();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          {/* <ReactQueryDevtools initialIsOpen={true} /> */}
          <Layout>
            {isLoading ? <LoadingSpinner /> : null}
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
