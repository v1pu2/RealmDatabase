import React, { Component } from "react";
import { View, Text, StatusBar } from "react-native";
import Dashboard from "./src/pages/Dashboard";
import Login from "./src/pages/Login";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }
  async componentDidMount() {
    const isLogin = await AsyncStorage.getItem("ISLOGIN");
    this.setState({ isLogin });
  }

  render() {
    const { isLogin } = this.state;

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLogin ? "Login" : "Dashboard"}>
          <Stack.Screen
            name='Login'
            component={Login}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name='Dashboard'
            component={Dashboard}
            options={{ title: "Dashboard" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default App;
