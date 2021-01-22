import React, { Component } from "react";

import styled from "styled-components";
import MyButton from "../component/MyButton";

const ViewList = (props) => {
  return (
    <>
      <Container>
       <Title>view screen</Title>
      </Container>
    </>
  );
};

export default ViewList;
const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 10px;
`;
const Title = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: red;
  margin-left:20px;
`;