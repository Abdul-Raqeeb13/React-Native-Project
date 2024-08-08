import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../Screens/SplashScreen';
import SignUp from '../Screens/SignUp';
import AppIntro from '../Screens/AppIntro';
import SignIn from '../Screens/SignIn';

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

         <Stack.Screen name="SignIn" component={SignIn}
          options={{
            headerShown : false
        }}  />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
