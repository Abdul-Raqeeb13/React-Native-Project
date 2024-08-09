import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomDrawerToggleButton from './DrawerToggleButton';

const CustomAppBar = ({ navigation, route, options, ...rest }) => {
  const [userName, setUserName] = useState('');
  const [userProfile, setUserProfile] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('LoginUserDetails');
        if (jsonValue != null) {
          const data = JSON.parse(jsonValue);
          setUserName(data.LoginUsername);
          setUserProfile(data.LoginUserProfile); // Assuming 'UserProfile' contains the URL of the profile picture
        }
      } catch (error) {
        console.error('Failed to load user data from AsyncStorage', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.appBar}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <Image source={{ uri: userProfile }} style={styles.profileImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 60,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 10,
    backgroundColor: '#663399',
    width: Dimensions.get('window').width-15, // Set the width to 100% of the screen
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  userInfo: {
    flex: 1, // This will take up the remaining space between the toggle button and the profile image
    alignItems: 'center', // Center the username text
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight:20

  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Ensuring the text color is visible against the background
  },
});

export default CustomAppBar;
