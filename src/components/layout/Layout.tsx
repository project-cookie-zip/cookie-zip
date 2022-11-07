import styled from "styled-components";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const Layout = ({ children }: any) => {
  const { pathname } = useRouter();

  const [noLayout, setNoLayout] = useState(false);

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
          {children}
          <Footer />
        </LayoutStyle>
      )}
    </>
  );
};

const LayoutStyle = styled.div`
  margin: 0 auto;
  max-width: 480px;
`;
