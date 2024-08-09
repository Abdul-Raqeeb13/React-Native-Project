import React, { useEffect, useState } from 'react';
import { View,  StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomDrawerToggleButton from './DrawerToggleButton';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import Home from '../Screens/Home';
const CustomAppBar = ({ navigation, route, options, ...rest }) => {

  // const [visible, setVisible] = React.useState(false);

  // const showModal = () => setVisible(true);
  // const hideModal = () => setVisible(false);
  // const containerStyle = {backgroundColor: 'yellow', padding: 20};



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

    <>
  {/* <PaperProvider> */}

    <View style={styles.appBar}>
    <View style={styles.userInfo}>
      <Text style={styles.userName}>{userName}</Text>
    </View>
    <TouchableOpacity>
    <Image source={{ uri: userProfile }} style={styles.profileImage} />
    </TouchableOpacity>
  </View>

    {/* <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Text>Example Modal.  Click outside this area to dismiss.</Text>
      </Modal>
    </Portal>
   
  </PaperProvider> */}


  </>

  );
};

const styles = StyleSheet.create({
  appBar: {
    height:56,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#C0C6C7',
    width: Dimensions.get('window').width-70, // Set the width to 100% of the screen
    // borderBottomWidth: 1,
    // backgroundColor: 'red',
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
