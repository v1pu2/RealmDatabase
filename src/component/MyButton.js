import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';

const CustomButton = (props) => (
  <ButtonContainer
    onPress={props.onPress}
    backgroundColor={props.backgroundColor}>
    <ButtonText>{props.title}</ButtonText>
  </ButtonContainer>
);

export default CustomButton;

const ButtonContainer = styled.TouchableOpacity`
	width: 90%;
  height: 40px;
  marginLeft:20px;
  marginTop:20px;
	padding: 12px;
	border-radius: 10px;	
  background-color: lightblue;
  justify-content:center;
`;

const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
  text-align: center;
`;
