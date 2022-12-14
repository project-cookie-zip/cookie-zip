import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Category() {
  const { pathname } = useRouter();

  const [noLayout, setNoLayout] = useState<boolean>(false);
  useEffect(() => {
    pathname === "/" ? setNoLayout(false) : setNoLayout(true);
  }, [pathname]);

  return (
    <CategoryWrap style={noLayout ? { display: "none" } : { display: "flex" }}>
      <div>인기</div>
      <Categorys>
        <button>전체</button>
        <button>게임</button>
        <button>음악</button>
        <button>요리</button>
        <button>쇼핑</button>
        {/* 카테고리 총목
        <button>스포츠</button>
        <button>동물</button>
        <button>연예</button>
        <button>뷰티</button>
        <button>영화</button>
        <button>먹방</button> */}
      </Categorys>
    </CategoryWrap>
  );
}

const CategoryWrap = styled.div`
  position: fixed;
  top: 23px;
  min-width: 480px;
  transition: 0.3s;
  color: ${props => props.theme.mainFontColor};
  background-color: ${props => props.theme.backgroundColor};
  margin-top: 20px;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #a9653b;
  border-bottom: 1px solid #a9653b;
`;

const Categorys = styled.div`
  width: 75vw;
  display: flex;
  justify-content: space-around;

  & button {
    background-color: #a9653b;
    width: 50px;
    height: 25px;
    border: none;
    border-radius: 10px;
    color: white;
  }
`;
