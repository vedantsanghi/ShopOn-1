import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Card, Header, Icon } from "react-native-elements";
import firebase from "firebase";

import db from "../config.js";

export default class ItemDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      userName: "",
      shopId: this.props.navigation.getParam("details")["user_id"],
      itemId: this.props.navigation.getParam("details")["item_id"],
      itemName: this.props.navigation.getParam("details")["item_name"],
      description: this.props.navigation.getParam("details")["description"],
      price: this.props.navigation.getParam("details")["price"],
      stock: this.props.navigation.getParam("details")["stock"],
      shopName: "",
      shopContact: "",
      shopAddress: "",
      ItemDocId: "",
    };
  }
  //   addNotification = () => {
  //     var msg =
  //       this.state.userName +
  //       " " +
  //       "has shown interest in exchanging item with you";
  //     db.collection("all_notifications").add({
  //       targeted_user_id: this.state.shopId,
  //       donor_id: this.state.userId,
  //       item_id: this.state.itemId,
  //       item_name: this.state.itemName,
  //       date: firebase.firestore.FieldValue.serverTimestamp(),
  //       notifications_status: "unread",
  //       message: msg,
  //     });
  //   };
  getShopDetails() {
    db.collection("stores")
      .where("email_id", "==", this.state.shopId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            shopName: doc.data().shop_name,
            shopContact: doc.data().contact,
            shopAddress: doc.data().address,
          });
        });
      });

    db.collection("all_items")
      .where("item_id", "==", this.state.itemId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({ ItemDocId: doc.id });
        });
      });
  }

  addOrder = () => {
    db.collection("all_orders").add({
      item_name: this.state.itemName,
      item_id: this.state.itemId,
      shop_name: this.state.shopName,
      buyer_id: this.state.userId,
      order_status: "Item Ordered",
    });
  };

  addRequest = () => {
    db.collection("all_requests").add({
      item_name: this.state.itemName,
      item_id: this.state.itemId,
      shop_name: this.state.shopName,
      buyer_id: this.state.userId,
      request_status: "Item Requested",
    });
  };

  componentDidMount() {
    this.getShopDetails();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.1 }}>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#696969"
                onPress={() => this.props.navigation.goBack()}
              />
            }
            centerComponent={{
              text: "Item Details",
              style: { color: "#90A5A9", fontSize: 20, fontWeight: "bold" },
            }}
            backgroundColor="#ff9800"
          />
        </View>

        <View style={{ flex: 0.3 }}>
          <ScrollView>
            <Card title={"Item Information"} titleStyle={{ fontSize: 20 }}>
              <Card>
                <Text style={{ fontWeight: "bold" }}>
                  Name : {this.state.itemName}
                </Text>
              </Card>
              <Card>
                <Text style={{ fontWeight: "bold" }}>
                  Description : {this.state.description}
                </Text>
              </Card>
              <Card>
                <Text style={{ fontWeight: "bold" }}>
                  Price : ₹{this.state.price}
                </Text>
              </Card>
              <Card>
                <Text style={{ fontWeight: "bold" }}>
                  Number Left: {this.state.stock}
                </Text>
              </Card>
            </Card>
          </ScrollView>
        </View>
        <View style={{ flex: 0.3 }}>
          <Card title={"Shop Information"} titleStyle={{ fontSize: 20 }}>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Name: {this.state.shopName}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Contact: {this.state.shopContact}
              </Text>
            </Card>
            <Card>
              <Text style={{ fontWeight: "bold" }}>
                Address: {this.state.shopAddress}
              </Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {this.state.stock !== 0 ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.addOrder();
              }}
            >
              <Text>I want to buy</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.updateItemStatus();
              }}
            >
              <Text>Request Item</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "orange",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
});
