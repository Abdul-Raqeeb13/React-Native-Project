import React, {useState , useEffect} from 'react'
import Navigation from './Config/Navigation'
import Toast from 'react-native-toast-message';
import 'react-native-gesture-handler'

export default function App() {


  return (
    <>
      <Navigation/>
      <Toast />

    </>
  )
}
