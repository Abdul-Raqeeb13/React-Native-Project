import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';

export default function Home() {

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20,margin:40};

  const [userName, setUserName] = useState(''); // Default user name
  const [profilePic, setProfilePic] = useState(null); // Default profile picture

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('LoginUserDetails');
        let data = JSON.parse(jsonValue)

        setUserName(data.LoginUsername)
        setProfilePic(data.LoginUserProfile)

        console.log("Data from home" , data);
      } 
      catch (error) {
        console.error('Failed to load user data from AsyncStorage', error);
      }
    }
     

    fetchUserData();
  }, []);


  // const ProfileView = () => {
  //   console.log("click");
    
  // }
  return (
    
    <PaperProvider>
    <View style={styles.container}>
      <View style={styles.appBar}>
     
        <View style={styles.profileContainer}>
      
           <Text>          <Text></Text>
           </Text>
         
          <Text style={styles.userName}>{userName}</Text>
           {profilePic ? (
            <TouchableOpacity  onPress={showModal}>
               <Avatar.Image size={50} source={{ uri: profilePic }} style={styles.profilePic}/>
              {/* <Image source={{ uri: profilePic }} style={styles.profilePic}/> */}
            </TouchableOpacity>
          ) : (
            <View style={styles.defaultPic} />
          )}
        </View>
      </View>

      <Portal>
        <Modal visible={visible} onPress={hideModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Image  source={{ uri: profilePic }} style={{width:'100%',height:'80%',}}/>
        </Modal>
      </Portal>
   
  
      {/* Rest of your home page content */}
      <View style={styles.content}>
        <Text>Welcome to the Home Page!</Text>
      </View>
    </View>
    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  appBar: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 15,
  
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent :"space-between",
    alignItems: 'center',
  },
  profilePic: {
    marginRight: 10,
  },
  // defaultPic: {
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  //   backgroundColor: '#ccc',
  //   marginRight: 10,
  // },

  userName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  // content: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   padding: 20,
  // },
});
