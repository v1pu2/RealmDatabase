import React, {Component} from 'react';
import {Button, View, Text, StatusBar} from 'react-native';

const Login = (props) => {
  const onSubmitClick = () => {
    props.navigation.navigate('Dashboard');
  };
  return (
    <View>
      <Text>this is login</Text>
      <Button title="submit" onPress={() => onSubmitClick()} />
    </View>
  );
};
export default Login;
