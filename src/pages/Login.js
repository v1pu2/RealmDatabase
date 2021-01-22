import React, {Component} from 'react';
import {Button, View, Text, TextInput, StatusBar} from 'react-native';
import {Formik} from 'formik';
import styled from 'styled-components';
import MyButton from '../component/MyButton';

const Login = (props) => {
  const onSubmitClick = () => {
    props.navigation.navigate('Dashboard');
  };
  return (
    <Container>
      <Title>this is login</Title>
      <Formik initialValues={{email: '', password: ''}}>
        {({values, handleChange}) => (
          <View>
            <TextInput
              value={values.email}
              onChangeText={handleChange('email')}
              placeholder="E-mail"
            />
            <TextInput
              value={values.password}
              onChangeText={handleChange('password')}
              placeholder="Password"
              secureTextEntry={true}
            />
            <Text>{JSON.stringify(values)}</Text>
            <MyButton title="submit" />
          </View>
        )}
      </Formik>

      {/* <Button title="submit" onPress={() => onSubmitClick()} /> */}
    </Container>
  );
};
export default Login;
const Container = styled.View`
  flex: 1;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: palevioletred;
`;
// const Input = styled.input`
//   width: 300px;
//   height: 35px;
//   border: 1px solid #ccc;
//   background-color: #fff;
// `;
