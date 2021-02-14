import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import { ListItem, Icon, SearchBar } from "react-native-elements";
import db from "../config";
import MyHeader from "../components/MyHeader";

export default class SearchItemsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData: [],
      query: "",
      originalData: [],
    };
  }

  searchItems = (data) => {
    console.log(data);
    var SearchedData = [];
    var query = this.state.query.toLowerCase();

    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      var data1 = data[i].item_name.toLowerCase();
      if (data1.includes(query, 0)) {
        SearchedData.push(data[i]);
      }
    }
    this.setState({
      fullData: SearchedData,
    });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.item_name}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        subtitle={"Price: ₹" + item.price}
        rightElement={
          <Icon
            name="chevron-right"
            type="font-awesome"
            color="#696969"
            onPress={() => {
              this.props.navigation.navigate("ItemDetails", {
                details: item,
              });
            }}
          />
        }
        bottomDivider
      />
    );
  };

  componentDidMount() {
    var allData = db.collection("all_items").onSnapshot((snapshot) => {
      var data = snapshot.docs.map((doc) => doc.data());
      this.setState({
        fullData: data,
        originalData: data,
      });
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Search Items" />
        <View>
          <SearchBar
            placeholder="Search items..."
            onChangeText={(query) => {
              this.setState({ query: query });
              this.searchItems(this.state.originalData);
            }}
            value={this.state.query}
          />
        </View>
        <View style={{ flex: 1 }}>
          {this.state.fullData.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>No Item found</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.fullData}
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
    marginTop: 100,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
