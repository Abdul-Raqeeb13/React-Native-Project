import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import SplashScreen from '../Screens/SplashScreen';
import SignUp from '../Screens/SignUp';
import AppIntro from '../Screens/AppIntro';
import SignIn from '../Screens/SignIn';
import Home from '../Screens/Home';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="SplashScreen" component={SplashScreen}
          options={{
            headerShown: false
          }} />
        <Stack.Screen name="AppIntro" component={AppIntro}
          options={{
            headerShown: false
          }} />

        <Stack.Screen name="SignUp" component={SignUp}
          options={{
            headerShown: false
          }} />

        <Stack.Screen name="SignIn" component={SignIn}
          options={{
            headerShown: false
          }} />

        <Stack.Screen name="DrawerNavigator" component={DrawerNavigation}
          options={{
            headerShown: false
          }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


const DrawerNavigation = () => {
  return(
    <Drawer.Navigator initialRouteName="Home" > 
      <Drawer.Screen name="Home" component={Home} options={{
        
      }}/>
      
      {/* <Drawer.Screen name="About" component={About} /> */}
  </Drawer.Navigator>
  )
}