import React, { Component } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
  Picker,
  Text,
  TouchableHighlight,
  Button,
} from "react-native";
import styled from "styled-components";
import MyButton from "../component/MyButton";
import Realm from "realm";
import { Formik } from "formik";
import DatePicker from "@react-native-community/datetimepicker";

let realm;


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      std: "",
      gender: "",
      birthdate: "09-10-2020",
      image: "",
      show: false,
    };
    realm = new Realm({ path: "StudDatabase.realm" });
  }

  onSubmitClick = (values) => {
    console.log("in submit click", values.birthdate);
    const { name, email, std, gender, birthdate, image } = values;
    realm.write(() => {
      var ID =
        realm.objects("stud_details").sorted("roll_no", true).length > 0
          ? realm.objects("stud_details").sorted("roll_no", true)[0].roll_no + 1
          : 1;
      realm.create("stud_details", {
        roll_no: ID,
        name: name,
        email: email,
        std: std,
        gender: gender,
        birthdate: birthdate,
        image: image,
      });
      Alert.alert(
        "Success",
        `Student with roll no ${ID} has been registered successfully.`,
        [
          {
            text: "Ok",
            onPress: this.onOk(),
          },
        ],
        { cancelable: false }
      );
    });
  };
  showDatePicker = () => {
    this.setState({ show: true });
  };
  onOk = () => {
    this.setState({
      name: "",
      email: "",
      std: "",
      gender: "",
      birthdate: "",
      image: "",
    });
    this.props.navigation.navigate("ViewList");
  };
  render() {
    const { show } = this.state;
    return (
      <>
        <Container>
          <ScrollView keyboardShouldPersistTaps='handled'>
            <Formik
              initialValues={{
                name: "",
                email: "",
                std: "",
                gender: "",
                birthdate: "",
                image: "",
              }}
              onSubmit={(values) => this.onSubmitClick(values)}
            >
              {({ values, handleChange, handleSubmit, setFieldValue }) => (
               
                <View>
                  <Input
                    placeholder='Enter Name'
                    onChangeText={handleChange("name")}
                    value={values.name}
                  />

                  <Input
                    value={values.email}
                    onChangeText={handleChange("email")}
                    keyboardType='email-address'
                    placeholder='Enter E-mail'
                  />

                  <Picker
                    selectedValue={values.std}
                    onChangeText={handleChange("std")}
                    onValueChange={(itemValue) => {
                      setFieldValue("std", itemValue);
                    }}
                  >
                    <Picker.Item
                      label='Select your Standard'
                      value={values.std}
                      key={0}
                    />
                    <Picker.Item
                      label='Junior KG'
                      value={"Junior KG"}
                      key={"1"}
                    />
                    <Picker.Item
                      label='Senior KG'
                      value={"Senior KG"}
                      key={"2"}
                    />
                    <Picker.Item
                      label='1st Standard'
                      value={"1st Standard"}
                      key={"3"}
                    />
                    <Picker.Item
                      label='2nd Standard'
                      value={"2nd Standard"}
                      key={"4"}
                    />
                    <Picker.Item
                      label='3rd Standard'
                      value={"3rd Standard"}
                      key={"5"}
                    />
                    <Picker.Item
                      label='4th Standard'
                      value={"4th Standard"}
                      key={"6"}
                    />
                    <Picker.Item
                      label='5th Standard'
                      value={"5th Standard"}
                      key={"7"}
                    />
                  </Picker>

                  <Picker
                    selectedValue={values.gender}
                    onChangeText={handleChange("gender")}
                    onValueChange={(itemValue) => {
                      setFieldValue("gender", itemValue);
                    }}
                  >
                    <Picker.Item
                      label='Select your gender'
                      value={values.gender}
                      key={0}
                    />
                    <Picker.Item label='Male' value={"Male"} key={1} />
                    <Picker.Item label='Female' value={"Female"} key={2} />
                  </Picker>

                  <View style={styles.buttonView}>
                    <TouchableHighlight onPress={this.showDatePicker}>
                      <Title>select your birthdate</Title>
                    </TouchableHighlight>
                  </View>
                  {/* {show && (
                      
                    <DatePicker
                      style={styles.datePickerStyle}
                      value={values.birthdate} // Initial date from state
                      mode='date' // The enum of date, datetime and time
                      placeholder='select date'
                      format='DD-MM-YYYY'
                      minDate='01-01-2016'
                      maxDate='01-01-2019'
                      confirmBtnText='Confirm'
                      cancelBtnText='Cancel'
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          left: 0,
                          top: 4,
                          marginLeft: 0,
                        },
                        dateInput: {
                          marginLeft: 36,
                        },
                      }}
                      onDateChange={(date) => {
                        handleChange(date);
                      }}
                    />
                  )} */}

                  <Input
                    value={values.image}
                    onChangeText={handleChange("image")}
                    placeholder='Enter Image'
                  />
                  <MyButton title='Submit' onPress={handleSubmit} />
                  </View>
              )}
            </Formik>
          </ScrollView>
        </Container>
      </>
    );
  }
}

export default Register;
const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 10px;
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
const Title = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: black;
  background: papayawhip;
  border: none;
  padding: 10px;
  border-radius: 3px;
  ::placeholder {
    color: palevioletred;
  }
`;

const styles = StyleSheet.create({
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingLeft: 8,
  },
  buttonTitleStyle: {
    color: "lightgrey",
    fontSize: 18,
  },
  dateStyle: {
    color: "gray",
    fontSize: 18,
    fontWeight: "normal",
  },
  buttonView: { margin: 10 },
  line: {
    borderBottomWidth: 1,
    width: "95%",
    marginLeft: 10,
    borderBottomColor: "black",
  },
});
