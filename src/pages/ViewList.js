import React, { Component } from "react";

import styled from "styled-components";
import {
  ScrollView,
  TouchableOpacity,
  SectionList,
  Text,
  StyleSheet,
  View,
} from "react-native";
import Realm from "realm";
import AccordionPanel from "../component/AccordionPanel";
let realm;

class ViewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flatListItems: [],
      text: "",
      search: "",
      isExpanded: false,
      activeIndex: 0,
      junior: [],
      senior: [],
      first: [],
      second: [],
      third: [],
      forth: [],
      fifth: [],
      filteredJunior: [],
      filteredSenior: [],
      filteredFirst: [],
      filteredSecond: [],
      filteredThird: [],
      filteredForth: [],
      filteredFifth: [],
    };
    realm = new Realm({ path: "StudDatabase.realm" });
    var user_details = realm.objects("stud_details");
    this.state = {
      flatListItems: user_details,
      filteredList: user_details || [],
    };
  }

  componentDidMount() {
    const { flatListItems } = this.state;
    // console.log("in didmount", flatListItems);
    let jun = [],
      sen = [],
      fst = [],
      sec = [],
      thr = [],
      fort = [],
      fif = [];
    for (let i = 0; i < flatListItems.length; i++) {
      // console.log("in loop", flatListItems[i]);
      let obj = {};

      if (flatListItems[i].std === "Senior KG") {
        obj = flatListItems[i];
        sen.push(obj);
        this.setState({ senior: sen, filteredSenior: sen });
      } else if (flatListItems[i].std === "Junior KG") {
        obj = flatListItems[i];
        jun.push(obj);
        this.setState({ junior: jun, filteredJunior: jun });
      } else if (flatListItems[i].std === "1st Standard") {
        obj = flatListItems[i];
        fst.push(obj);
        this.setState({ first: fst, filteredFirst: fst });
      } else if (flatListItems[i].std === "2nd Standard") {
        obj = flatListItems[i];
        sec.push(obj);
        this.setState({ second: sec, filteredSecond: sec });
      } else if (flatListItems[i].std === "3rd Standard") {
        obj = flatListItems[i];
        thr.push(obj);
        this.setState({ third: thr, filteredThird: thr });
      } else if (flatListItems[i].std === "4th Standard") {
        obj = flatListItems[i];
        fort.push(obj);
        this.setState({ forth: fort, filteredForth: fort });
      } else if (flatListItems[i].std === "5th Standard") {
        obj = flatListItems[i];
        fif.push(obj);
        this.setState({ fifth: fif, filteredFifth: fif });
      }
    }
  }
  checkFilter = (list, text) => {
    const newData = list.filter(function (item) {
      let fullName, itemData;
      const itemName = item.name ? item.name.toUpperCase() : "".toUpperCase();
      const email = item.email ? item.email.toUpperCase() : "".toUpperCase();

      fullName = itemName.concat(email);
      itemData = fullName ? fullName.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    return newData;
  };
  SearchFilterFunction_sec = (text) => {
    const {
      flatListItems,
      senior,
      junior,
      first,
      second,
      third,
      forth,
    } = this.state;
    console.log("in filter senior", senior);
    if (text) {
      let new_data;
      new_data = this.checkFilter(senior, text);
      new_data = this.checkFilter(junior, text);
      new_data = this.checkFilter(first, text);

      this.setState({
        filteredSenior: new_data,
        filteredJunior: new_data,
        filteredFirst: new_data,

        search: text,
      });
    } else {
      this.setState({
        filteredSenior: senior,
        filteredJunior: junior,
        filteredFirst: first,

        search: text,
      });
    }
  };
  SearchFilterFunction = (text) => {
    const { flatListItems } = this.state;
    if (text) {
      const newData = flatListItems.filter(function (item) {
        let fullName, itemData;
        const itemName = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const email = item.email ? item.email.toUpperCase() : "".toUpperCase();

        fullName = itemName.concat(email);
        itemData = fullName ? fullName.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      console.log("new data", newData);
      this.setState({ filteredList: newData, search: text });
    } else {
      this.setState({ filteredList: flatListItems, search: text });
    }
  };
  onCustomizeClik = (item, index) => {
    this.setState({ isExpanded: true, activeIndex: index });
  };
  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={styles.listItemSeparatorStyle} />
    );
  };
  render() {
    const { search, filteredSenior, filteredJunior } = this.state;

    return (
      <>
        <Container>
          <Input
            placeholder='Search Here'
            placeholderTextColor='gray'
            autoFocus={false}
            onChangeText={(text) => this.SearchFilterFunction_sec(text)}
            value={search}
          />
          <SectionList
            ItemSeparatorComponent={this.FlatListItemSeparator}
            sections={[
              { title: "Standard Junior", data: filteredJunior || [] },
              { title: "Standard Senior", data: filteredSenior || [] },
              { title: "1st Standard", data: this.state.filteredFirst || [] },
              { title: "2nd Standard", data: this.state.filteredSecond || [] },
              { title: "3rd Standard", data: this.state.filteredThird || [] },
              { title: "4th Standard", data: this.state.filteredForth || [] },
              { title: "5th Standard", data: this.state.filteredFifth || [] },
            ]}
            renderSectionHeader={({ section }) => (
              <Text style={styles.sectionHeaderStyle}>{section.title}</Text>
            )}
            renderItem={({ item }) => (
              <RowView>
                <Text style={styles.sectionListItemStyle}>{item.roll_no}</Text>
                <Text style={styles.sectionListItemStyle}>{item.name}</Text>
                <Text style={styles.sectionListItemStyle}>{item.email}</Text>
                <Text style={styles.sectionListItemStyle}>{item.gender}</Text>
              </RowView>
            )}
            keyExtractor={(item, index) => index}
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
  font-weight: 700;
  color: black;
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
const ItemView = styled.View`
  background-color: white;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  padding: 10px;
  border-color: black;
  border-width: 1px;
`;
const TxtEndIcon = styled.Text`
  font-size: 26px;
  text-align-vertical: center;
  color: black;
  padding: 5px;
`;
const EndView = styled.View`
  justify-content: center;
  align-self: center;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  background-color: gray;
  align-items: center;
`;
const StartRowView = styled.View`
  flex-direction: row;
  width: 92%;
  align-items: center;
`;
const RowView = styled.View`
  flex-direction: row;
  margin-right: 5px;
`;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  sectionHeaderStyle: {
    backgroundColor: "#CDDC89",
    fontSize: 20,
    padding: 5,
    color: "#fff",
  },
  sectionListItemStyle: {
    fontSize: 15,
    padding: 15,
    color: "#000",
    backgroundColor: "#F5F5F5",
  },
  listItemSeparatorStyle: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#C8C8C8",
  },
});
