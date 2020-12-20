import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import { login } from '../redux/ActionCreators';

const mapDispatchToProps = (dispatch) => ({
  login : (name, password) => dispatch(login(name,password))
  
});
class Login extends Component   {
  state = {
    name:'',
    password:'',
  }
  
  

  render(){
    return (
      <View style={{ justifyContent: 'center', margin: 20 }}>
        <Input
          placeholder='Username'
          leftIcon={{ name: 'user-o', type: 'font-awesome' }}
          value={this.state.name}
          onChangeText={(u) => this.setState( {name: u.toLowerCase()})} />
        <Input
          placeholder='Password'
          leftIcon={{ name: 'key', type: 'font-awesome' }}
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(p) => this.setState({ password: p.toLowerCase() })} />
        <CheckBox containerStyle={{ backgroundColor: null }}
          title='Remember Me' center />
        <View style={{ marginTop: 20 }}>
          <Button title='Login' color='#7cc' onPress={() => this.login(this.state.name,this.state.password) } />
        </View>
      </View>
    );
  }

  login(name, password) {
    this.props.login(name,password);
}
};



export default connect(null,mapDispatchToProps)(Login);