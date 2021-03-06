// redux
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

import React, { Component } from "react";
import { FlatList } from "react-native";
import {
  ListItem,
  Avatar,
  Card,
  Text,
  Button,
  Icon,
  CardDeck,
} from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";
import * as Animatable from "react-native-animatable";


class Menu extends Component {
  render() {
    if (this.props.products.isLoading) {
      return <Loading />;
    } else if (this.props.products.errMess) {
      return <Text>{this.props.errMess}</Text>;
    } else {
      return (
        <FlatList
          data={this.props.products.products}
          renderItem={({ item, index }) => this.renderMenuItem(item, index)}
          keyExtractor={(item) => item.id.toString()}
        />
      );
    }
  }

  renderMenuItem(item, index) {
    const { navigate } = this.props.navigation;
    return (
      <Animatable.View animation="fadeInRightBig" duration={2000}>
        <ListItem
          key={index}
          onPress={() => navigate("Productdetail", { productId: item.id })}
          style={{marginTop:10}}         
        >
          <Avatar
            source={{ uri: baseUrl + item.image }}
            style={{ height: 70, width: 60 }}
          />
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle style={{ color: "red" }}>
              {item.price} $
            </ListItem.Subtitle>
            <ListItem.Subtitle>{item.ingredients}</ListItem.Subtitle>
          </ListItem.Content>
          <Icon
            raised
            reverse
            name="plus-circle"
            type="font-awesome"
            color="#f50"
          />
        </ListItem>
      </Animatable.View>
    );
  }
}
export default connect(mapStateToProps)(Menu);
