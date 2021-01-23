import React, { Component } from "react";
import { View, Text, StatusBar } from "react-native";
import Dashboard from "./src/pages/Dashboard";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import ViewList from "./src/pages/ViewList";
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
    this.setState({ isLogin: isLogin });
  }

  render() {
    const { isLogin } = this.state;
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLogin===true? "Dashboard" : "Login"}
        >
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
          <Stack.Screen
            name='Register'
            component={Register}
            options={{ title: "Register Screen" }}
          />
          <Stack.Screen
            name='ViewList'
            component={ViewList}
            options={{ title: "View List" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default App;
