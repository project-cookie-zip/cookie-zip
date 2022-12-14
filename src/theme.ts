import { DefaultTheme } from "styled-components";

// ##### README ###############
// 사용하려는 styled component에
// transition: 0.3s; 를 꼭 넣어주세요

export const darkTheme: DefaultTheme = {
  backgroundColor: "#1b1b1b",
  mainFontColor: "white",
  subFontColor: "#929292",
};

export const lightTheme: DefaultTheme = {
  backgroundColor: "white",
  mainFontColor: "black",
  subFontColor: "#929292",
};

// USAGE ############ pages>videos>[id].tsx에 적용돼있음
// background-color: ${props => props.theme.backgroundColor};
// color: ${props => props.theme.mainFontColor};
// & span {
//   color: ${props => props.theme.subFontColor};
// }
//
// .....
