import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Button, Image } from "react-native";
import { Input, Text } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import { setLogoutState } from "../redux/ActionCreators";

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(setLogoutState()),
});
class Logout extends Component {
  render() {
    return (
      <View style={{ justifyContent: "center", marginTop: 50 }}>
           <Image
                  source={require('../assets/aus.png')}
                  style={{ padding: 10,
                    margin: 60,
                    height: 200,
                    width: 300,
                    resizeMode: "stretch",
                    alignItems: "center",}}
                />
        <Button onPress={()=> this.logout()} color="red" title="LogOut"/>
      </View>
    );
  }
  logout() {
    this.props.logout();
  }
}

export default connect(null, mapDispatchToProps)(Logout);
