import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import { Layout } from "../src/components/layout/Layout";
import { List } from "../src/components/list/List";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const response = fetch("/api/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(data => {
      if (data.status === 404) {
        // console.log(data);
        router.replace("/login");
      } else {
        console.log(data);
      }
    });
  }, []);
  return (
    <div>
      <Head>
        <title>CookieZIP</title>
        <meta
          name="hello cookieZIP"
          content="upload your videos and watching!"
        />
        <meta property="og:title" content="Cookie-zip" />
        <meta property="og:description" content="쿠키영상 심플하게 즐기자!" />
        <meta
          property="og:image"
          content="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FxuqSn%2FbtrUDiTCMEz%2FuK5c7jywvxJnKeyu6VRaK1%2Fimg.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <List />
    </div>
  );
}

const Hello = styled.div`
  color: red;
`;
