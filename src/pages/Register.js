import React, { Component } from "react";
import { View, ScrollView, KeyboardAvoidingView, Alert,StyleSheet } from "react-native";
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
      birthdate: "",
      //   Birth_Date: "",
      image: "",
      show: false,
    };
    realm = new Realm({ path: "StudDatabase.realm" });
  }

  onSubmitClick = (values) => {
    // console.log("in submit click", values.name);
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
              {({ values, handleChange, handleSubmit }) => (
                <KeyboardAvoidingView
                  behavior='padding'
                  style={{ flex: 1, justifyContent: "space-between" }}
                >
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

                  <Input
                    value={values.std}
                    onChangeText={handleChange("std")}
                    placeholder='Enter Std'
                  />
                  <Input
                    value={values.gender}
                    onChangeText={handleChange("gender")}
                    placeholder='Enter Gender'
                  />
                  <Input
                    value={values.birthdate}
                    onChangeText={handleChange("birthdate")}
                    placeholder='Enter Birthdate'
                  />
                  {/* <DatePicker
                    style={styles.datePickerStyle}
                    date={values.birthdate} // Initial date from state
                    mode='date' // The enum of date, datetime and time
                    placeholder='select date'
                    format='DD-MM-YYYY'
                    minDate='01-01-2016'
                    maxDate='01-01-2019'
                    confirmBtnText='Confirm'
                    cancelBtnText='Cancel'
                    customStyles={{
                      dateIcon: {
                        //display: 'none',
                        position: "absolute",
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        marginLeft: 36,
                      },
                    }}
                    // onDateChange={(date) => {
                    // handleChange(date)
                    // }}
                  /> */}
                  {/* <View style={styles.buttonView}>
                    <Button
                      title={Birth_Date || "Date of Birth"}
                      onPress={this.showDatePicker}
                      type='clear'
                      titleStyle={
                        Birth_Date ? styles.dateStyle : styles.buttonTitleStyle
                      }
                      containerStyle={styles.buttonContainer}
                    />
                    <View style={styles.line} />
                  </View>
                  {show && (
                    <DateTimePicker
                      value={new Date()}
                      mode={mode}
                      // is24Hour
                      display='default'
                      maximumDate={new Date()}
                      onChange={this.setDate}
                    />
                  )} */}
                  <Input
                    value={values.image}
                    onChangeText={handleChange("image")}
                    placeholder='Enter Image'
                  />
                  <MyButton title='Submit' onPress={handleSubmit} />
                </KeyboardAvoidingView>
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
  font-size: 14px;
  font-weight: 500;
  color: red;
  margin-left: 20px;
`;

const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   padding: 10,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
    // title: {
    //   textAlign: 'center',
    //   fontSize: 20,
    //   fontWeight: 'bold',
    //   padding: 20,
    // },
    datePickerStyle: {
      width: 200,
      marginTop: 20,
    },
  });
