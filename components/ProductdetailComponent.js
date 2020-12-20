// redux
import { connect } from "react-redux";
import { postFavorite, postComment } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    products: state.products,
    comments: state.comments,
    favorites: state.favorites,
    login: state.login
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (productId) => dispatch(postFavorite(productId)),
  postComment: (productId, rating, author, comment) =>
  dispatch(postComment(productId, rating, author, comment)),
});

import React, { Component } from "react";
import {
  View,
  Text,
  YellowBox,
  ScrollView,
  FlatList,
  StyleSheet,
  Modal,
  Button,
  LogBox,
  TextInput,
  PanResponder,
  Alert,
  
} from "react-native";
import { Card, Image, Icon, Input, Rating, Label } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";

class RenderDish extends Component {
  render() {
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
      if (dx < -100) return true; // right to left
      return false;
    };
    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
      if (dx > -100) return true; // right to left
      return false;
    };
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => { return true; },
      onPanResponderEnd: (e, gestureState) => {
        if (recognizeDrag(gestureState)) {
          Alert.alert(
            'Add To Your Cart',
            'Are you sure you wish to add ' + product.name + ' to your card?',
            [
              { text: 'Cancel', onPress: () => { /* nothing */ } },
              { text: 'OK', onPress: () => { this.props.favorite ? alert('Already in your card') : this.props.onPress() } },
            ],
            { cancelable: false }
          );
        }
        if (recognizeComment(gestureState)) {
          
          this.props.onPressAddComment();
        }
        return true;
      }
    });
    const product = this.props.product;
    if (product != null) {
      return (
        <Card {...panResponder.panHandlers}>
          <Image
            source={{ uri: baseUrl + product.image }}
            style={{
              width: "100%",
              height: 100,
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card.FeaturedTitle>{product.name}</Card.FeaturedTitle>
          </Image>
          <Text style={{ margin: 10 }}>{product.ingredients}</Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Icon
              raised
              reverse
              name={this.props.favorite ? "shopping-cart" : "shopping-cart"}
              type="font-awesome"
              color="#f50"
              onPress={() => {
                this.props.login ? (
                this.props.favorite ? alert("Already in your Card") : this.props.onPress()) : (alert("Please login before using this service"))

              }
              }
            />
            <Icon
              raised
              reverse
              name="pencil" 
              type="font-awesome"
              color="#512DA8"
              onPress={this.props.onPressAddComment}
            />
          </View>
        </Card>
      );
    }
    return (<View />);
  }
}

function RenderComments(props) {
  const comments = props.comments;
  return (
    <Card>
      <Card.Title>Comments</Card.Title>
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  );
}

const renderCommentItem = ({ item, index }) => {
  return (
    <View key={index} style={{ margin: 10 }}>
      <Text style={{ fontSize: 14 }}>{item.comment}</Text>
      <Rating
        imageSize={15}
        readonly
        startingValue={item.rating}
        style={{ alignItems: "flex-start" }}
      />
      <Text style={{ fontSize: 12 }}>
        {"-- " + item.author + ", " + item.date}{" "}
      </Text>
    </View>
  );
};

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
      author: "",
      comment: "",
      showModal: false,
    };
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }
  static navigationOptions = {
    title: "Productdetail",
  };

  render() {
    const productId = parseInt(this.props.route.params.productId);
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <RenderDish
            product={this.props.products.products[productId]}
            favorite={this.props.favorites.some((el) => el === productId)}
            login = {this.props.login.isLoggedIn}
            onPress={() => this.markFavorite(productId)}
            onPressAddComment={this.toggleModal}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
          <RenderComments
            comments={this.props.comments.comments.filter(
              (comment) => comment.productId === productId
            )}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.showModal}
            onDismiss={() => this.toggleModal()}
            onRequestClose={() => this.toggleModal()}
          >
            <View style={styles.modal}>
              <Rating
                imageSize={30}
                startingValue={5}
                showRating
                onFinishRating={this.ratingCompleted}
                style={{ paddingVertical: 10 }}
              />
              <View style={styles.SectionStyle}>
                {this.props.login.isLoggedIn ?(
                  <>
                <Image
                  source={{ uri: baseUrl + "images/author.png" }}
                  style={styles.ImageStyle}
                />
                <TextInput
                  style={{ flex: 1 }}
                  placeholder="Author :"
                  onChangeText={this.handleAuthorInput}
                  underlineColorAndroid="transparent"
                  value={this.props.login.user.name}
                />
                </>
                ) : (
                  <>
                  <Image
                  source={{ uri: baseUrl + "images/author.png" }}
                  style={styles.ImageStyle}
                  />
                <TextInput
                  style={{ flex: 1 }}
                  placeholder="Author :"
                  editable={false} selectTextOnFocus={false}
                  underlineColorAndroid="transparent"
                />
                </>
                )}
              </View>
              <View style={styles.SectionStyle}>
                <Image
                  source={{ uri: baseUrl + "images/comment.png" }}
                  style={styles.ImageStyle}
                />
                <TextInput
                  style={{ flex: 1 }}
                  placeholder="Comment :"
                  onChangeText={this.handleCommentInput}
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={{ margin: 10 }}>
                <Button
                  onPress={() => {
                    this.handleComment();
                    this.resetForm();
                  }}
                  color="#00802b"
                  title="Submit"
                />
              </View>
              <View style={{ margin: 10 }}>
                <Button
                  onPress={() => {
                    this.toggleModal();
                    this.resetForm();
                  }}
                  color="gray"
                  title="Cancel"
                />
              </View>
            </View>
          </Modal>
        </Animatable.View>
      </ScrollView>
    );
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleReservation() {
    console.log(JSON.stringify(this.state));
    this.toggleModal();
  }

  ratingCompleted = (rating) => {
    this.setState({ rating });
  };

  handleAuthorInput = (author) => {
    this.setState({ author });
  };

  handleCommentInput = (comment) => {
    this.setState({ comment });
  };

  resetForm() {
    this.setState({
      rating: null,
      author: "",
      comment: "",
    });
  }

  handleComment() {
    const { rating, author, comment } = this.state;
    const productId = parseInt(this.props.route.params.productId);

    this.toggleModal();
    this.props.postComment(productId, rating, author, comment);
  }

  markFavorite(productId) {
    if ( this.props.login.isLoggedIn)
    {
    alert("Added to your card ")
    this.props.postFavorite(productId);
    }
    else {
      alert("Please login before using this service")
    }
  }
}

const styles = StyleSheet.create({
  icons: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomColor: "silver",
    borderBottomWidth: 1,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
