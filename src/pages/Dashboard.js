import React, { Component } from "react";

import styled from "styled-components";
import MyButton from "../component/MyButton";
const Dashboard = (props) => {
  return (
    <>
      <Container>
        <MyButton title='Register Student' onPress={()=>props.navigation.navigate("Register")} />
        <MyButton title='View List' onPress={()=>props.navigation.navigate("ViewList")} />
      </Container>
    </>
  );
};

export default Dashboard;
const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 10px;
  justify-content:center;
`;
