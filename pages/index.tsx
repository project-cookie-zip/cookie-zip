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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <List />
    </div>
  );
}

const Hello = styled.div`
  color: red;
`;
