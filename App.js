import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { AppStackNavigator } from "./components/AppStackNavigation";
import { AppTabNavigator } from "./components/AppTabNavigator";
import LogInScreen from "./screens/LoginScreen";
import SearchItemsScreen from "./screens/SearchItemsScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  LogInScreen: { screen: LogInScreen },
  SearchItemsScreen: { screen: AppStackNavigator },
  AppTabNavigator:{screen: AppTabNavigator},
});

const AppContainer = createAppContainer(SwitchNavigator);
