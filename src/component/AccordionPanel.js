import React from "react";
import styled from "styled-components";

const AccordionPanel = (props) => {
  const { item, key } = props;

  return (
    <Container>
      <Title>Name : {item.name}</Title>
      <Title>Email : {item.email}</Title>
      <Title>Gender : {item.gender}</Title>
    </Container>
  );
};
export default AccordionPanel;
const Title = styled.Text`
  font-size: 14px;
  color: black;
  padding-right: 5px;
  margin-bottom: 5px;
`;
const Container = styled.View`
  justify-content: center;
  align-self: center;
  width: 95%;
  border-bottom-width: 1;
  border-left-width: 1;
  border-right-width: 1;
  border-color: black;
  padding: 5px;
`;
