import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ListItem, Icon, SearchBar } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";
import { TextInput } from "react-native-gesture-handler";
import { Image } from "react-native";

export default class MyStockScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      allItems: [],
      stock: 0,
      query: "",
      originalItems: [],
    };
    this.itemRef = null;
  }

  changeStock = (stock, docId) => {
    db.collection("all_items").doc(docId).update({
      stock: stock,
    });
  };

  getAllItems = () => {
    this.itemRef = db
      .collection("all_items")
      .where("user_id", "==", this.state.userId)
      .onSnapshot((snapshot) => {
        var allItems = [];
        snapshot.docs.map((doc) => {
          var items = doc.data();
          items["doc_id"] = doc.id;
          allItems.push(items);
        });
        this.setState({
          allItems: allItems,
          originalItems: allItems,
        });
      });
  };

  searchItems = (data) => {
    var SearchedData = [];
    var query = this.state.query.toLowerCase();
    console.log("searched");
    for (var i = 0; i < data.length; i++) {
      if (data[i].item_name.toLowerCase().includes(query, 0)) {
        SearchedData.push(data[i]);
      }
    }
    this.setState({
      allItems: SearchedData,
    });
  };

  componentDidMount() {
    this.getAllItems();
  }

  componentWillUnmount() {
    this.itemRef;
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    this.setState({
      stock: item.stock,
    });
    return (
      <ListItem
        key={i}
        title={item.item_name}
        subtitle={"Price: ₹" + item.price}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        rightElement={
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignContent: "flex-end",
              alignSelf: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                var stock = Number(this.state.stock);
                this.setState({
                  stock: stock - 1,
                });
                this.changeStock(this.state.stock, item.doc_id);
              }}
            >
              <Image
                source={require("../assets/minus.png")}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
            <TextInput
              style={{
                width: 25,
                height: 25,
                alignSelf: "center",
                borderColor: "#ffab91",
                borderRadius: 10,
                borderWidth: 1,
              }}
              keyboardType="numeric"
              onChangeText={(text) => {
                this.setState({
                  stock: text,
                });
                this.changeStock(this.state.stock, item.doc_id);
              }}
              value={this.state.stock}
            />
            <TouchableOpacity
              onPress={() => {
                var stock = Number(this.state.stock);
                this.setState({
                  stock: stock + 1,
                });
                this.changeStock(this.state.stock, item.doc_id);
              }}
            >
              <Image
                source={require("../assets/plus.png")}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          </View>
        }
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="My Stock" />
        <View>
          <SearchBar
            placeholder="Search items..."
            onChangeText={(query) => {
              this.setState({ query: query });
              this.searchItems(this.state.originalItems);
            }}
            value={this.state.query}
          />
        </View>
        <View style={{ flex: 1 }}>
          {this.state.allItems.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>List Of Your Stock</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allItems}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
});
