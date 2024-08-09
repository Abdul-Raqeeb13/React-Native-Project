import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import SplashScreen from '../Screens/SplashScreen';
import SignUp from '../Screens/SignUp';
import AppIntro from '../Screens/AppIntro';
import SignIn from '../Screens/SignIn';
import Home from '../Screens/Home';
import CustomAppBar from '../Components/CustomAppBar';
import Profile from '../Screens/Profile';
import { DrawerContent } from './DrawerContent';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();



export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppIntro"
          component={AppIntro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const DrawerNavigation = () => {


  // const [visible, setVisible] = React.useState(false);

  // const showModal = () => setVisible(true);
  // const hideModal = () => setVisible(false);
  // const containerStyle = {backgroundColor: 'white', padding: 20};


  // const [userName, setUserName] = useState('');
  // const [userProfile, setUserProfile] = useState('');





  // useEffect(() => {
  //   const fetchUserName = async () => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem('LoginUserDetails');
  //       if (jsonValue != null) {
  //         const data = JSON.parse(jsonValue);
  //         setUserName(data.LoginUsername);
  //         setUserProfile(data.LoginUserProfile);
  //         console.log(data.LoginUserProfile);

  //       }
  //     } catch (error) {
  //       console.error('Failed to load username from AsyncStorage', error);
  //     }
  //   };

  //   fetchUserName();
  // }, []);

  return (
    <Drawer.Navigator initialRouteName="Home"    drawerContent={props =><DrawerContent {...props} />}>
      
      <Drawer.Screen
        name="Home"
        component={Home}
     
        options={{
          headerTitle: () => (
            <CustomAppBar />
          
          ), // Display username in header title
          headerStyle: {
            backgroundColor: '#0059FF',

          },


        }}
      />

      <Drawer.Screen name="Profile" component={Profile} 
      
      options={{
          headerTitle: () => (
            <CustomAppBar />
          ),
          headerStyle: {
            backgroundColor: '#663399',

          },


        }}/>

    </Drawer.Navigator>
  );
};


const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },

  appBar: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: Dimensions.get('window').width - 70, // Set the width to 100% of the screen
  },
  userInfo: {
    flex: 1, // This will take up the remaining space between the toggle button and the profile image
    alignItems: 'center', // Center the username text
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20

  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Ensuring the text color is visible against the background
  },
});
