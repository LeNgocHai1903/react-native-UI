import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";
import Communications from "react-native-communications";

class Contact extends Component {
  render() {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card>
          <Card.Title>Contact Information</Card.Title>
          <Card.Divider />
          <Text style={{ margin: 10 }}>18/42 Tăng Bạt Hổ</Text>
          <Text style={{ margin: 10 }}>Bình Thạnh district</Text>
          <Text style={{ margin: 10 }}>Hồ Chí Minh City</Text>
          <Text style={{ margin: 10 }}>Tel: +852 1234 5678</Text>
          <Text style={{ margin: 10 }}>Fax: +852 8765 4321</Text>
          <Text style={{ margin: 10 }}>Email:thepub@gmail.com</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              justifyContent: "center",
              marginTop: 15,
              padding: 10,
              backgroundColor: "#BFAF67",
            }}
            
          >
            {/* <Text style={{ color: "#fff", textAlign: "center" }} >  
            <Icon name="envelope-o" type="font-awesome" color="white" />            
              Send an Email
              
            </Text> */}
            <Button
              title=" Send Email"
              buttonStyle={{ backgroundColor: "#BFAF67" }}
              icon={
                <Icon name="envelope-o" type="font-awesome" color="white" />
              }
              onPress={() =>
                Communications.email(
                  ["lehai19031998@gmail.com"],
                  null,
                  null,
                  "Demo Subject",
                  "Demo Content for the mail"
                )
              }
            />
          </TouchableOpacity>
        </Card>
      </Animatable.View>
    );
  }
  sendMail() {
    MailComposer.composeAsync({
      recipients: ["confusion@food.net"],
      subject: "From Confusion",
      body: "Hello my friends ...",
    });
  }
}
export default Contact;
