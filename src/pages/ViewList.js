import React, { Component } from "react";

import styled from "styled-components";
import MyButton from "../component/MyButton";
import { FlatList, Text, View } from "react-native";
import Realm from "realm";
let realm;
class ViewList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          FlatListItems: [],
        };
        realm = new Realm({ path: "StudDatabase.realm" });
        var user_details = realm.objects("stud_details");
        this.state = {
          FlatListItems: user_details,
        };
      }
      ListViewItemSeparator = () => {
        return (
          <View style={{ height: 0.5, width: "100%", backgroundColor: "#000" }} />
        );
      };
  render() {
    return (
      <>
        <Container>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: "white", padding: 20 }}>
              <Text>Id: {item.roll_no}</Text>
              <Text>Name: {item.name}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Gender: {item.gender}</Text>
              <Text>Std: {item.std}</Text>
            </View>
          )}
        />
        </Container>
      </>
    );
  }
}

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
  margin-left: 20px;
`;



