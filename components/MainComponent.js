// redux
import { connect } from "react-redux";
import {
  fetchProducts,
  fetchComments,
  fetchLeaders,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => ({
  login: state.login,
});

const mapDispatchToProps = (dispatch) => ({
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchProducts: () => dispatch(fetchProducts()),
  fetchComments: () => dispatch(fetchComments()),
});

import React, { Component } from "react";
import { View, Text, Linking } from "react-native";
import { Icon, Image } from "react-native-elements";

import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./HomeComponent";
import About from "./AboutComponent";
import Menu from "./MenuComponent";
import ProductDetail from "./ProductdetailComponent";
import QR from "./QR";
import Contact from "./ContactComponent";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./LoginComponent";
import Register from "./RegisterComponent";
import Reservation from "./ReservationComponent";
import Logout from "./LogoutComponent";
import Favorites from "./FavoriteComponent";
import { baseUrl } from "../shared/baseUrl";
import ShoppingCartIcon from "./ShoppingCartIcon";

const ShoppingCartIconNavigator = createStackNavigator();

const TabNavigator = createBottomTabNavigator();
function TabNavigatorScreen() {
  return (
    <TabNavigator.Navigator
      initialRouteName="Login"
      tabBarOptions={{
        activeBackgroundColor: "#000000",
        inactiveBackgroundColor: "#fff",
        activeTintColor: "#fff",
        inactiveTintColor: "gray",
      }}
    >
      <TabNavigator.Screen
        name="Login"
        component={Login}
        options={{
          tabBarLabel: "Login",
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="sign-in"
              type="font-awesome"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="Register"
        component={Register}
        options={{
          tabBarLabel: "Register",
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="user-plus"
              type="font-awesome"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </TabNavigator.Navigator>
  );
}
const FavoritesNavigator = createStackNavigator();
function FavoritesNavigatorScreen() {
  return (
    <FavoritesNavigator.Navigator
      initialRouteName="Favorites"
      screenOptions={{
        headerStyle: { backgroundColor: "#000000" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <FavoritesNavigator.Screen
        name="Favorites"
        component={Favorites}
        options={({ navigation }) => ({
          headerTitle: "Your Cart",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <MenuNavigator.Screen
        name="Productdetail"
        component={ProductDetail}
        options={{
          headerTitle: "Productdetail",
        }}
      />
    </FavoritesNavigator.Navigator>
  );
}

const QRNavigator = createStackNavigator();
function QRNavigatorScreen() {
  return (
    <QRNavigator.Navigator
      initialRouteName="QR"
      screenOptions={{
        headerStyle: { backgroundColor: "#000000" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <QRNavigator.Screen
        name="QR"
        component={QR}
        options={({ navigation }) => ({
          headerTitle: "QR",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </QRNavigator.Navigator>
  );
}

const LogoutNavigator = createStackNavigator();
function LogoutNavigatorScreen() {
  return (
    <LogoutNavigator.Navigator
      initialRouteName="LogOut"
      screenOptions={{
        headerStyle: { backgroundColor: "#000000" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <LogoutNavigator.Screen
        name="LogOut"
        component={Logout}
        options={({ navigation }) => ({
          headerTitle: "Are you sure want to logout?",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </LogoutNavigator.Navigator>
  );
}

const HomeNavigator = createStackNavigator();
function HomeNavigatorScreen() {
  return (
    <HomeNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "#000000" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <HomeNavigator.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerTitle: "Home",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </HomeNavigator.Navigator>
  );
}

const AboutNavigator = createStackNavigator();
function AboutNavigatorScreen() {
  return (
    <AboutNavigator.Navigator
      initialRouteName="About"
      screenOptions={{
        headerStyle: { backgroundColor: "#000000" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <AboutNavigator.Screen
        name="About"
        component={About}
        options={({ navigation }) => ({
          headerTitle: "About",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </AboutNavigator.Navigator>
  );
}
const LoginNavigator = createStackNavigator();
function LoginNavigatorScreen() {
  return (
    <LoginNavigator.Navigator
      initialRouteName="LoginRegister"
      screenOptions={{
        headerStyle: { backgroundColor: "#000000" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <LoginNavigator.Screen
        name="LoginRegister"
        component={TabNavigatorScreen}
        options={({ navigation }) => ({
          headerTitle: "Login | Register",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </LoginNavigator.Navigator>
  );
}
const MenuNavigator = createStackNavigator();
function MenuNavigatorScreen() {
  return (
    <MenuNavigator.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerStyle: { backgroundColor: "#000000" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <MenuNavigator.Screen
        name="Menu"
        component={Menu}
        options={({ navigation }) => ({
          headerTitle: "Menu",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <MenuNavigator.Screen
        name="Productdetail"
        component={ProductDetail}
        navigationOptions={{
          headerTitle: "Productdetail",
        }}
      />
    </MenuNavigator.Navigator>
  );
}

const ContactNavigator = createStackNavigator();
function ContactNavigatorScreen() {
  return (
    <ContactNavigator.Navigator
      initialRouteName="Contact"
      screenOptions={{
        headerStyle: { backgroundColor: "#000000" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <ContactNavigator.Screen
        name="Contact"
        component={Contact}
        options={({ navigation }) => ({
          headerTitle: "Contact",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </ContactNavigator.Navigator>
  );
}

const ReservationNavigator = createStackNavigator();
function ReservationNavigatorScreen() {
  return (
    <ReservationNavigator.Navigator
      initialRouteName="Reservation"
      screenOptions={{
        headerStyle: { backgroundColor: "#000000" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <ReservationNavigator.Screen
        name="Reservation"
        component={Reservation}
        options={({ navigation }) => ({
          headerTitle: "Reserve Table",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </ReservationNavigator.Navigator>
  );
}

const MainNavigator = createDrawerNavigator();
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          backgroundColor: "#000000",
          height: 80,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/7.png")}
            style={{ margin: 10, width: 80, height: 60 }}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold" }}>
            THE PUBS
          </Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        icon={({ focused, color, size }) => (
          <Icon name="help" size={size} color={focused ? "#000000" : "#ccc"} />
        )}
        onPress={() =>
          Linking.openURL("https://reactnavigation.org/docs/getting-started")
        }
      />
    </DrawerContentScrollView>
  );
}
class MainNavigatorScreen extends Component {
  render() {
    return (
      <MainNavigator.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <MainNavigator.Screen
          name="Home"
          component={HomeNavigatorScreen}
          options={{
            title: "Home",
            drawerIcon: ({ focused, size }) => (
              <Icon
                name="home"
                size={size}
                color={focused ? "#000000" : "#ccc"}
              />
            ),
          }}
        />
        <MainNavigator.Screen
          name="About"
          component={AboutNavigatorScreen}
          options={{
            title: "About Us",
            drawerIcon: ({ focused, size }) => (
              <Icon
                name="info"
                size={size}
                color={focused ? "#000000" : "#ccc"}
              />
            ),
          }}
        />
        <MainNavigator.Screen
          name="Menu"
          component={MenuNavigatorScreen}
          options={{
            title: "Menu",
            drawerIcon: ({ focused, size }) => (
              <Icon
                name="menu"
                size={size}
                color={focused ? "#000000" : "#ccc"}
              />
            ),
          }}
        />
        <MainNavigator.Screen
          name="Contact"
          component={ContactNavigatorScreen}
          options={{
            title: "Contact Us",
            drawerIcon: ({ focused, size }) => (
              <Icon
                name="address-card"
                type="font-awesome"
                size={size}
                color={focused ? "#000000" : "#ccc"}
              />
            ),
          }}
        />
        {/* <MainNavigator.Screen
          name="Your Cart"
          component={FavoritesNavigatorScreen}
          options={{
            headerShown: false,
            title: "Your Cart",
            drawerIcon: ({ focused, size }) => (
              <Icon
                name="shopping-cart"
                type="font-awesome"
                size={size}
                color={focused ? "#000000" : "#ccc"}
              />
            ),
          }}
        /> */}
        {this.props.login.isLoggedIn ? (
          <>
            <MainNavigator.Screen
              name="Reservation"
              component={ReservationNavigatorScreen}
              options={{
                title: "Reserve Table",
                drawerIcon: ({ focused, size }) => (
                  <Icon
                    name="cutlery"
                    type="font-awesome"
                    size={size}
                    color={focused ? "#000000" : "#ccc"}
                  />
                ),
              }}
            />
            <MainNavigator.Screen
              name={` ${this.props.login.userId}'s Shopping Cart`}
              component={FavoritesNavigatorScreen}
              options={{
                headerShown: false,
                drawerIcon: ({ focused, size }) => (
                  <Icon
                    name="user-circle-o"
                    type="font-awesome"
                    size={size}
                    color={focused ? "#000000" : "#ccc"}
                  />
                ),
              }}
            />
            <MainNavigator.Screen
              name="Loyalty Card"
              component={QRNavigatorScreen}
              options={{
                headerShown: false,
                drawerIcon: ({ focused, size }) => (
                  <Icon
                    name="qrcode"
                    type="font-awesome"
                    size={size}
                    color={focused ? "#000000" : "#ccc"}
                  />
                ),
              }}
            />
            <MainNavigator.Screen
              name="LogOut"
              component={LogoutNavigatorScreen}
              options={{
                headerShown: false,
                drawerIcon: ({ focused, size }) => (
                  <Icon
                    name="sign-out"
                    type="font-awesome"
                    size={size}
                    color={focused ? "#000000" : "#ccc"}
                  />
                ),
              }}
            />
          </>
        ) : (
          <MainNavigator.Screen
            name="LogIn"
            component={LoginNavigatorScreen}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <Icon
                  name="sign-in"
                  type="font-awesome"
                  size={size}
                  color={focused ? "#000000" : "#ccc"}
                />
              ),
            }}
          />
        )}

        {/* <MainNavigator.Screen
        name="Login"
        component={LoginNavigatorScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="sign-in"
              type="font-awesome"
              size={size}
              color={focused ? "#000000" : "#ccc"}
            />
          ),
        }}
      /> */}
      </MainNavigator.Navigator>
    );
  }
}

class Main extends Component {
  componentDidMount() {
    // redux
    this.props.fetchLeaders();
    this.props.fetchProducts();
    this.props.fetchComments();
  }

  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen login={this.props.login} />
        {this.props.login.isLoggedIn ? (<ShoppingCartIcon />) : <></>}
      </NavigationContainer>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
