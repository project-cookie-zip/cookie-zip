import styled from "styled-components";

export const SubscribeBtn = () => {
  // subscribe
  const toSubscribe = () => {
    console.log("구독");
  };

  return <SubsBtn onClick={() => toSubscribe()}>구독</SubsBtn>;
};

const SubsBtn = styled.button`
  padding: 5px;
  margin-right: 20px;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  width: 60px;
  height: 40px;
  background-color: #df9e75;
`;
const subscribeCancle = styled.button`
  padding: 5px;
  margin-right: 20px;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  width: 60px;
  height: 40px;
  background-color: #df9e75;
`;
