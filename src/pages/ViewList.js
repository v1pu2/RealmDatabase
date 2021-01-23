import React, { Component } from "react";

import styled from "styled-components";
import { ScrollView, TouchableOpacity } from "react-native";
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
    };
    realm = new Realm({ path: "StudDatabase.realm" });
    var user_details = realm.objects("stud_details");
    this.state = {
      flatListItems: user_details,
      filteredList: user_details || [],
    };
  }

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
      this.setState({ filteredList: newData, search: text });
    } else {
      this.setState({ filteredList: flatListItems, search: text });
    }
  };
  onCustomizeClik = (item, index) => {
    this.setState({ isExpanded: true, activeIndex: index });
  };
  render() {
    const { search, filteredList, isExpanded, activeIndex } = this.state;
    return (
      <>
        <Container>
          <Input
            placeholder='Search Here'
            placeholderTextColor='gray'
            autoFocus={false}
            onChangeText={(text) => this.SearchFilterFunction(text)}
            value={search}
          />

          <ScrollView>
            {filteredList &&
              filteredList.map((item, index) => {
                return (
                  <>
                    <ItemView>
                      <TouchableOpacity
                        onPress={() => this.onCustomizeClik(item, index)}
                        activeOpacity={0.7}
                      >
                        <RowView>
                          <StartRowView>
                            <Title>{item.std}</Title>
                          </StartRowView>
                          <EndView>
                            <TxtEndIcon>
                              {isExpanded && index === activeIndex ? "-" : "+"}
                            </TxtEndIcon>
                          </EndView>
                        </RowView>
                      </TouchableOpacity>
                    </ItemView>

                    {isExpanded && index === activeIndex && (
                      <AccordionPanel key={item.roll_no} item={item} />
                    )}
                  </>
                );
              })}
          </ScrollView>
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
