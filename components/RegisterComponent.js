import React, { Component } from 'react';
import { ScrollView, View, Button, Image } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { baseUrl } from '../shared/baseUrl';
import * as ImageManipulator from "expo-image-manipulator";
import {connect} from 'react-redux'
import { register } from '../redux/ActionCreators';

const mapDispatchToProps = (dispatch) => ({
  signup: (name,password,email) => dispatch(register(name,password,email)),
});


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      email: '',
      remember: false
    }
  }
  handleRegister(name, password, email) {
    this.props.signup(name,password,email);
  }


  render() {
    return (
      <ScrollView>
        <View style={{ justifyContent: 'center', margin: 20 }}>
          <Input
            placeholder='Username'
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            value={this.state.name}
            onChangeText={(name) => this.setState({ name : name.toLowerCase() })} />
          <Input
            placeholder='Password'
            leftIcon={{ type: 'font-awesome', name: 'key' }}
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password : password.toLowerCase() })} />
          <Input
            placeholder='Email'
            secureTextEntry={true}
            leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email:  email.toLowerCase() })} />
          <CheckBox containerStyle={{ backgroundColor: null }}
            title='Remember Me' center
            checked={this.state.remember}
            onPress={() => this.setState({ remember: !this.state.remember })} />
          <View style={{ marginTop: 20 }}>
            <Button title='Register' color='#7cc' onPress={() => this.handleRegister(this.state.name,this.state.password,this.state.email)} />
          </View>
        </View>
      </ScrollView>
    );
  }
  // async getImageFromCamera() {
  //   const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
  //   const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  //   if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
  //     let capturedImage = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3] });
  //     if (!capturedImage.cancelled) {
  //       //alert(JSON.stringify(capturedImage));
  //       this.processImage(capturedImage.uri);
  //     }
  //   }
    
  // }
  // handleRegister() {
  //   if (this.state.remember) {
  //     SecureStore
  //       .setItemAsync('userinfo', JSON.stringify({ username: this.state.username, password: this.state.password }))
  //       .catch((error) => console.log('Could not save user info', error));
  //     alert('Remembered user!');
  //   }
  // }
}
export default connect(null,mapDispatchToProps)(Register);