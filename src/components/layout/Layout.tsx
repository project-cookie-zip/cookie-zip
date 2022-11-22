import styled from "styled-components";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Category from "./Category";

export const Layout = ({ children }: any) => {
  const { pathname } = useRouter();

  const [noLayout, setNoLayout] = useState<boolean>(false);

  useEffect(() => {
    pathname === "/login" || pathname === "/sign"
      ? setNoLayout(true)
      : setNoLayout(false);
  }, [pathname]);

  return (
    <>
      {noLayout ? (
        <LayoutStyle>
          {children}
          <Footer />
        </LayoutStyle>
      ) : (
        <LayoutStyle>
          <Header />
          <Category />
          {children}
          <Footer />
        </LayoutStyle>
      )}
    </>
  );
};

const LayoutStyle = styled.div`
  margin: 0 auto;
  max-width: 100vw;
`;
