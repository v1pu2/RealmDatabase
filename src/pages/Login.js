import React, {Component, Fragment} from 'react';
import {Button, View, Text, TextInput, StatusBar, Alert} from 'react-native';
import {Formik} from 'formik';
import styled from 'styled-components';
import MyButton from '../component/MyButton';
import * as yup from 'yup';
import AsyncStorage from '@react-native-community/async-storage';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onSubmitClick = (values) => {
    AsyncStorage.setItem('ISLOGIN', 'true');
    this.props.navigation.navigate('Dashboard');
  };

  loginValidationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8)
      .max(16)
      .matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]$')
      .required(),
  });
  render() {
    return (
      <Container>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={(values) => this.onSubmitClick(values)}
          validationSchema={yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().min(6).required(),
          })}>
          {({values, handleChange, errors, touched, handleSubmit}) => (
            <View style={{width: '100%'}}>
              <Input
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder="E-mail"
              />
              {touched.email && errors.email && <Title>{errors.email}</Title>}
              <Input
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="Password"
                secureTextEntry={true}
              />
              {touched.password && errors.password && (
                <Title>{errors.password}</Title>
              )}
              <MyButton title="submit" onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </Container>
    );
  }
}
export default Login;
const Container = styled.View`
  flex: 1;
  background-color: white;
  justify-content: center;
  align-items: center;
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
