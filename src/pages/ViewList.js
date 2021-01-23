import React, { Component } from "react";

import styled from "styled-components";
import MyButton from "../component/MyButton";
import { FlatList, Text, View, ScrollView, StyleSheet } from "react-native";
import Realm from "realm";
let realm;
class ViewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flatListItems: [],
      text: "",
      search: "",
    };
    realm = new Realm({ path: "StudDatabase.realm" });
    var user_details = realm.objects("stud_details");
    this.state = {
      flatListItems: user_details,
      filteredList: user_details || [],
    };
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.5, width: "100%", backgroundColor: "#000" }} />
    );
  };
  SearchFilterFunction = (text) => {
    const { flatListItems } = this.state;
    if (text) {
      const newData = flatListItems.filter(function (item) {
        let fullName,itemData;
        const itemName = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const email=item.email? item.email.toUpperCase():"".toUpperCase();

        fullName = itemName.concat(email);
        itemData = fullName ? fullName.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({ filteredList: newData, search: text });
    } else {
      this.setState({ filteredList: flatListItems, search: text });
    }
  };
  render() {
    const { search, filteredList } = this.state;
    return (
      <>
        <Container>
          <Input
            placeholder='Search Here'
            placeholderTextColor='gray'
            inputStyle={styles.txtSearch}
            autoFocus={false}
            onChangeText={(text) => this.SearchFilterFunction(text)}
            inputContainerStyle={styles.input}
            value={search}
            containerStyle={styles.inputContainerStyle}
          />

          <FlatList
            data={filteredList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={styles.itemView}
              >
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
const Input = styled.TextInput`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: palevioletred;
  }
`;
const styles = StyleSheet.create({
  inputContainerStyle: {
    marginTop: 5,
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
  },
  mainContainer: { padding: 15, justifyContent: "center" },
  mainCenterContainer: { padding: 15, flex: 1 },
  input: { backgroundColor: "white", borderBottomWidth: 0 },
  txtSearch: { color: "black", fontSize: 14 },
  itemView:{
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  }
});
