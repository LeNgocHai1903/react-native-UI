import React, { Component } from "react";
import { View, Button } from "react-native";
import { Input, CheckBox } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import QRCode from "react-native-qrcode-svg";

class QR extends Component {
  render() {
    return (
      <View style={{alignItems:"center", marginTop:150}}>
        <QRCode
          value="Done!"
          logo={require('../assets/done.png')}
          size={300}
          logoBackgroundColor="transparent"
        />
      </View>
    );
  }
}

export default QR;
