import Router from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";

// 만들어보긴 했지만, 데이터 로딩시간으로 인해
// 현재로선 react query의 loading을 이용하는게 더 좋을 것 같음
// query의 isLoading || useLoading을 같이 적용하는 것에 대한
// 성능적인 부분 파악해볼 예정
// ㄴ=== query의 isloading이 console에 더 일찍 찍힘
// 해당 코드는 _app.tsx에만 적용하는 것이 좋을 것 같음
// (페이지 이동 시 next 특성-페이지를 다 받고난 뒤 불러오기-을 처리해주기 위해)
// 적용 결과: 훨씬 부드럽게 로딩으로 넘어가는 것이 체감됨
export const useLoading = () => {
  const [nowLoading, setNowLoading] = useState<boolean>(false);
  useEffect(() => {
    const start = () => {
      setNowLoading(true);
    };
    const end = () => {
      setNowLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return nowLoading ? true : false;
};
