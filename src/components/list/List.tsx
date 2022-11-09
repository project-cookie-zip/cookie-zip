import { ListItems } from "./ListItems";
import styled from "styled-components";
export const List = () => {
  return (
    <STListContainer>
      <ListItems />
      <ListItems />
    </STListContainer>
  );
};

const STListContainer = styled.div`
  margin-top: 30px;
`;
