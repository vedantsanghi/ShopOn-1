import React, { Component } from "react";
import { Header, Badge, Icon } from "react-native-elements";
import { View, Text, StyeSheet, Alert } from "react-native";
import db from "../config";
import firebase from "firebase";

export default class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }
  
  render() {
    return (
      <Header
        // leftComponent={
        //   <Icon
        //     name="bars"
        //     type="font-awesome"
        //     color="#696969"
        //     onPress={() => this.props.navigation.toggleDrawer()}
        //   />
        // }
        centerComponent={{
          text: this.props.title,
          style: { color: "#fff", fontSize: 20, fontWeight: "bold" },
        }}

        backgroundColor="#ff9800"
      />
    );
  }
}
