import Head from 'next/head'
import styled from "styled-components"

export default function Home() {
  return (
    <div>
      <Head>
        <title>CookieZIP</title>
        <meta name="hello cookieZIP" content="upload your videos and watching!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hello>ㅎㅇ 한번 만들어보자구우</Hello>
    </div>
  )
}



const Hello = styled.div`
  color:red;
`