import React, { Component } from "react";

import styled from "styled-components";
import MyButton from "../component/MyButton";
import Realm from "realm";
let realm;
class Dashboard extends Component {
  constructor(props) {
    super(props);
    realm = new Realm({
      path: "StudDatabase.realm",
      schema: [
        {
          name: "stud_details",
          properties: {
            roll_no: { type: "int", default: 0 },
            name: "string",
            email: "string",
            std: "string",
            gender: "string",
            birthdate: "string",
            image: "string",
          },
        },
      ],
    });
  }
  render() {
    return (
      <>
        <Container>
          <MyButton
            title='Register Student'
            onPress={() => this.props.navigation.navigate("Register")}
          />
          <MyButton
            title='View List'
            onPress={() => this.props.navigation.navigate("ViewList")}
          />
        </Container>
      </>
    );
  }
}

export default Dashboard;
const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 10px;
  justify-content: center;
`;
