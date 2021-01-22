import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';

const CustomButton = (props) => (
  <ButtonContainer
    onPress={() => alert('Hi!')}
    backgroundColor={props.backgroundColor}>
    <ButtonText>{props.title}</ButtonText>
  </ButtonContainer>
);

export default CustomButton;

const ButtonContainer = styled.TouchableOpacity`
	width: 100px;
	height: 40px
	padding: 12px;
	border-radius: 10px;	
	background-color: '#626262';
`;

const ButtonText = styled.Text`
  font-size: 15px;
  color: white;
  text-align: center;
`;
