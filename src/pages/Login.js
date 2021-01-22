import React, {Component} from 'react';
import {Button, View, Text, StatusBar} from 'react-native';
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
      <MyButton title="submit" />
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
