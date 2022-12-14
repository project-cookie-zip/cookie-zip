import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { Layout } from "../src/components/layout/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { useLoading } from "src/hooks/useLoading";
import { LoadingSpinner } from "src/components/videos/video/LoadingSpinner";
import { ReactQueryDevtools } from "react-query/devtools";
import { Mobile } from "src/hooks/useMideaQuery";
import { CannotDesktop } from "src/desktop/CannotDesktop";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  // for loadingSpinner
  const isLoading: boolean = useLoading();
  const isMobile = Mobile();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        {isMobile ? (
          <Layout>
            {isLoading ? <LoadingSpinner /> : null}
            <Component {...pageProps} />
          </Layout>
        ) : (
          <CannotDesktop />
        )}
      </RecoilRoot>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}
