import React, { Component } from "react";
import { FlatList, Text, Alert, Button,View } from "react-native";
import { ListItem, Avatar, Image } from "react-native-elements";
import Loading from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";
import { deleteFavorite } from "../redux/ActionCreators";
import Swipeout from "react-native-swipeout";
import * as Animatable from "react-native-animatable";
const mapStateToProps = (state) => {
  return {
    products: state.products,
    favorites: state.favorites,
  };
};
const mapDispatchToProps = (dispatch) => ({
  deleteFavorite: (productId) => dispatch(deleteFavorite(productId)),
});

class Favorites extends Component {
  deleteAll() {
    this.props.deleteAll()
  }
  render() {
    
    if (this.props.products.isLoading) {
      return <Loading />;
    } else if (this.props.products.errMess) {
      return <Text>{this.props.products.errMess}</Text>;
    } else if(this.props.favorites.length === 0) {
      return (
        <View style={{ justifyContent: "center", marginTop: 50 }}>
           <Image
                  source={require('../assets/5.png')}
                  style={{ padding: 10,
                    margin: 60,
                    height: 300,
                    width: 300,
                    resizeMode: "stretch",
                    alignItems: "center",}}
                />
      </View>
      )
    } else {
      const products = this.props.products.products.filter((p) =>
        this.props.favorites.some((el) => el === p.id)
      );
      return (
        <>
        <FlatList
          data={products}
          renderItem={({ item, index }) => this.renderMenuItem(item, index)}
          keyExtractor={(item) => item.id.toString()}
        />
        </>
      );
    }
  }
  renderMenuItem(item, index) {
    const rightButton = [
      {
        text: "Delete",
        type: "delete",

        onPress: () => {
          Alert.alert(
            "Delete Favorite?",
            "Are you sure you wish to delete the favorite dish " +
              item.name +
              "?",
            [
              {
                text: "Cancel",
                onPress: () => {
                  /* nothing */
                },
              },
              { text: "OK", onPress: () => this.props.deleteFavorite(item.id) },
            ],
            { cancelable: false }
          );
        },
      },
    ];
    const { navigate } = this.props.navigation;

    return (
      <Swipeout right={rightButton} autoClose={true}>
        <Animatable.View animation="fadeInRightBig" duration={2000}>
          <ListItem
            key={index}
            onPress={() => navigate("Productdetail", { productId: item.id })}
          >
            <Avatar source={{ uri: baseUrl + item.image }} />
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.ingredients}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          
        </Animatable.View>
      </Swipeout>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
