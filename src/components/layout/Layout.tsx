import styled from "styled-components";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Category from "./Category";
import { useLocalStorage } from "src/hooks/useLocalStorage";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "src/theme";

export const Layout = ({ children }: any) => {
  const { pathname } = useRouter();

  const [noLayout, setNoLayout] = useState<boolean>(false);

  useEffect(() => {
    pathname === "/login" || pathname === "/sign"
      ? setNoLayout(true)
      : setNoLayout(false);
  }, [pathname]);

  const [isDark, setIsDark] = useLocalStorage("cookie-dark");

  return (
    <>
      {noLayout ? (
        <LayoutStyle>
          {children}
          <Footer />
        </LayoutStyle>
      ) : (
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <LayoutStyle>
            <Header setIsDark={setIsDark} />
            <Category />
            {children}
            <Footer />
          </LayoutStyle>
        </ThemeProvider>
      )}
    </>
  );
};

const LayoutStyle = styled.div`
  margin: 0 auto;
  max-width: 100vw;
  height: 900px;
  transition: 0.3s;
  background-color: ${props => props.theme.backgroundColor};
`;
