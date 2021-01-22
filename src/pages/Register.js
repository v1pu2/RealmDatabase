import React, { Component } from "react";

import styled from "styled-components";
import MyButton from "../component/MyButton";
const Register = (props) => {
  return (
    <>
      <Container>
       <Title>register screen</Title>
      </Container>
    </>
  );
};

export default Register;
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