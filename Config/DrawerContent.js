import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, Image, ImageBackground } from 'react-native'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Title,
  Caption,
  Drawer,

} from 'react-native-paper';

import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer'

export function DrawerContent(props) {

  const [userName, setUserName] = useState('');
  const [userProfile, setUserProfile] = useState('');
  const [userEmail , setUserEmail] = useState('')

  useEffect(() => {
      const fetchUserName = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('LoginUserDetails');
          if (jsonValue != null) {
            const data = JSON.parse(jsonValue);
            setUserName(data.LoginUsername);
            setUserProfile(data.LoginUserProfile);
            setUserEmail(data.LoginUserEmail)
            // console.log(data.LoginUserProfile);
  
          }
        } catch (error) {
          console.error('Failed to load username from AsyncStorage', error);
        }
      };
  
      fetchUserName();
    }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View>

          <View>
            <ImageBackground source={{ uri: 'https://img.freepik.com/premium-photo/dark-green-plant-with-dark-green-leaves-dark-background_949246-7860.jpg?ga=GA1.1.1778619907.1708775132&semt=ais_hybrid' }} style={{ width: '100%', height: 180, marginTop: '-2%' }}>
              <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                  <Image source={{uri: userProfile}} style={styles.profilePic} />
                  <View style={styles.userDetails}>
                    <Title style={styles.title}>{userName}</Title>
                    <Caption style={styles.caption}>{userEmail}</Caption>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem icon={({ color, size }) => (
                <Icon2 name="home-outline" color={color} size={size} /> )}
                label="Home" onPress={() => { props.navigation.navigate('Home') }} />

            <DrawerItem icon={({ color, size }) => (
                <FeatherIcon name="user" color={color} size={size} /> )}
                label="Profile" onPress={() => { props.navigation.navigate('Profile') }} />

          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 10,
    height: 180,
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 35,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  userDetails: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  drawerSection: {
    marginTop: 10,
  },
});

