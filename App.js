import * as Notifications from 'expo-notifications';
import 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator  } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import Home from './src/components/Home';
import Critical from './src/components/menus/critical/Critical';
import People from './src/components/menus/people/People';
import Processes from './src/components/menus/processes/Processes';
import Providers from './src/components/menus/providers/Providers';
import Premises from './src/components/menus/premises/Premises';
import Profile from './src/components/menus/profile/Profile';
import Login from './src/components/auth/Login';
import Logout from './src/components/auth/Logout';
import CriticalInfo from './src/components/menus/critical/details/CriticalInfo';
import CriticalContacts from './src/components/menus/critical/details/CriticalContacts';
import CriticalLocation from './src/components/menus/critical/details/CriticalLocation';
import GeneralDetail from './src/components/shared/GeneralDetail';
import OwnScenarios from './src/components/shared/OwnScenarios';
import Sidebar from './src/components/shared/Sidebar';
import userReducer from './src/reducer/UserReducer';

const store = createStore(userReducer);

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#e36f2c",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator 
    initialRouteName="Home"
    screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} options={{ title: 'BIZCOVERY', headerShown: false }}/>
      <Stack.Screen name="Critical" 
      component={Critical}
      options={({ navigation, route }) => ({
        title: 'Critical Information - Business', 
        headerRight: () => (
          <TouchableOpacity
            sytle={styles.drawerButton}
            onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
          >
            <Ionicons name="ios-menu" size={32} style={{ color: 'white', marginRight: 20}} />
          </TouchableOpacity>
        ), 
      })} />
      <Stack.Screen name="People" component={People} 
      options={({ navigation, route }) => ({
        title: 'People - Action Cards', 
        headerRight: () => (
          <TouchableOpacity
            sytle={styles.drawerButton}
            onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
          >
            <Ionicons name="ios-menu" size={32} style={{ color: 'white', marginRight: 20 }} />
          </TouchableOpacity>
        ), 
      })} />
      <Stack.Screen name="Processes" component={Processes} 
      options={({ navigation, route }) => ({
        title: 'Processes - Action Cards', 
        headerRight: () => (
          <TouchableOpacity
            sytle={styles.drawerButton}
            onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
          >
            <Ionicons name="ios-menu" size={32} style={{ color: 'white', marginRight: 20 }} />
          </TouchableOpacity>
        ), 
      })} />
      <Stack.Screen name="Providers" component={Providers}
      options={({ navigation, route }) => ({
        title: 'Providers - Action Cards', 
        headerRight: () => (
          <TouchableOpacity
            sytle={styles.drawerButton}
            onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
          >
            <Ionicons name="ios-menu" size={32} style={{ color: 'white', marginRight: 20 }} />
          </TouchableOpacity>
        ), 
      })} />
      <Stack.Screen name="Premises" component={Premises}
      options={({ navigation, route }) => ({
        title: 'Premises - Action Cards', 
        headerRight: () => (
          <TouchableOpacity
            sytle={styles.drawerButton}
            onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
          >
            <Ionicons name="ios-menu" size={32} style={{ color: 'white', marginRight: 20 }} />
          </TouchableOpacity>
        ), 
      })} />
      <Stack.Screen name="Profile" component={Profile}
      options={({ navigation, route }) => ({
        title: 'Profile - Action Cards', 
        headerRight: () => (
          <TouchableOpacity
            sytle={styles.drawerButton}
            onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
          >
            <Ionicons name="ios-menu" size={32} style={{ color: 'white', marginRight: 20 }} />
          </TouchableOpacity>
        ), 
      })} />
      <Stack.Screen name="CriticalInfo" component={CriticalInfo}
      options={({ navigation, route }) => ({
        title: 'Critical Information - Business', 
        headerRight: () => (
          <TouchableOpacity
            sytle={styles.drawerButton}
            onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
          >
            <Ionicons name="ios-menu" size={32} style={{ color: 'white', marginRight: 20 }} />
          </TouchableOpacity>
        ), 
      })} />
      <Stack.Screen name="CriticalContacts" component={CriticalContacts}
      options={({ navigation, route }) => ({
        title: 'Critical Information - Business', 
        headerRight: () => (
          <TouchableOpacity
            sytle={styles.drawerButton}
            onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
          >
            <Ionicons name="ios-menu" size={32} style={{ color: 'white', marginRight: 20 }} />
          </TouchableOpacity>
        ), 
      })} />
      <Stack.Screen name="CriticalLocation" component={CriticalLocation}
      options={({ navigation, route }) => ({
        title: 'Critical Information - Business', 
        headerRight: () => (
          <TouchableOpacity
            sytle={styles.drawerButton}
            onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
          >
            <Ionicons name="ios-menu" size={32} style={{ color: 'white', marginRight: 20 }} />
          </TouchableOpacity>
        ), 
      })} />
      <Stack.Screen name="GeneralDetail" component={GeneralDetail}
      options={({ navigation, route }) => ({
        title: '', 
        headerRight: () => (
          <TouchableOpacity
            sytle={styles.drawerButton}
            onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
          >
            <Ionicons name="ios-menu" size={32} style={{ color: 'white', marginRight: 20 }} />
          </TouchableOpacity>
        ), 
      })} />
      <Stack.Screen name="OwnScenarios" component={OwnScenarios}
      options={({ navigation, route }) => ({
        title: '', 
        headerRight: () => (
          <TouchableOpacity
            sytle={styles.drawerButton}
            onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
          >
            <Ionicons name="ios-menu" size={32} style={{ color: 'white', marginRight: 20 }} />
          </TouchableOpacity>
        ), 
      })} />
    </Stack.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Stack"
      headerMode="none"
      drawerContent={(props) => <Sidebar {...props} />}
      drawerPosition="right">
      <Drawer.Screen
        name="Stack"
        component={ HomeStackNavigator }
      ></Drawer.Screen>
      <Drawer.Screen
        name="Login"
        component={ Login }
        options={{ 
          drawerLabel: 'Login',
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Logout"
        component={ Logout }
        options={{ 
          drawerLabel: 'Logout',
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default function App() {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  Text.defaultProps = Text.defaultProps || {};
  // Ignore dynamic type scaling on iOS
  Text.defaultProps.allowFontScaling = false;

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImg: {
    width:80,
    height:80,
    borderRadius:40,
    marginTop:20
  },
  sidebarDivider: {
    height:1,
    width:"100%",
    backgroundColor:"lightgray",
    marginVertical:10
  },
  drawerButton: {
    padding: 20
  }
});
