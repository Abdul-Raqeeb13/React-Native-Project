import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../Screens/SplashScreen';
import SignUp from '../Screens/SignUp';
import AppIntro from '../Screens/AppIntro';

const Stack = createNativeStackNavigator();

export default Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen}
        options={{
            headerShown : false
        }} />
        <Stack.Screen name="AppIntro" component={AppIntro}
        options={{
            headerShown : false
        }} />
             
         <Stack.Screen name="SignUp" component={SignUp}
          options={{
            headerShown : false
        }}  />

        {/* <Stack.Screen name="OnBoarding" component={OnBoarding}
        options={{
            headerShown : false
        }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
