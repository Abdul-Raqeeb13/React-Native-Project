import React, { useState } from 'react';
import { View, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Modal, Portal, Text, Provider as PaperProvider, TextInput } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function SignUp() {

  // for moadl open and clse control
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // for camera control
  const [file , setfile] = useState("")

  const openCamera = () => {
    setVisible(false)
    const option = {
      mediaType: 'photo',
      quality: 0.8
  }

  launchCamera(option, (response) => {
    if (response.didCancel) {
        console.log('User cancelled the camera.');
    }
    else if (response.error) {
        console.log('Camera Error: ', response.error);
    }
    else {
        // Use the image from the camera here
        console.log('Image URI camera: ', response.assets[0].uri);
        setfile(response.assets[0].uri)
       

    }

})
  } 

  const openImageGallery = () => {
    setVisible(false)
    const option = {
      mediaType: 'photo',
      quality: 0.8
  }

 

    launchImageLibrary(option, (response) => {
      if (response.didCancel) {
          console.log('User cancelled the camera.');
      }
      else if (response.error) {
          console.log('Camera Error: ', response.error);
      }
      else {
          // Use the image from the camera here
          console.log('Image URI: ', response.assets[0].uri);
          setfile(response.assets[0].uri)
         

      }

  })

}
  


  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Image source={require("../Assets/layer3.png")} style={styles.image} />
        <View style={styles.overlay}>
          <Text style={styles.title}>SignUp</Text>
        </View>

        <View style={styles.form}>
          <TextInput style={styles.inp} mode='outlined' label="Name" />
          <TextInput style={styles.inp} mode='outlined' label="Email" />
          <TextInput style={styles.inp} mode='outlined' label="Password" />
          <Text style={styles.text}>Upload Image</Text>
          <TouchableOpacity style={styles.imgCon} onPress={showModal}>
            <FeatherIcon name="image" size={30} color="black" />
          </TouchableOpacity>


        {/* react native paper modal */}
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.modalContainer}
            >
              <View style={styles.selectIamgeModelContainer}>

                <TouchableOpacity style={styles.selectModeIcon} onPress={()=>openImageGallery()}>
                  <MaterialIcon name="image" size={30} color="black" />
                  <Text>Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.selectModeIcon} onPress={()=>openCamera()}>
                  <MaterialIcon name="camera" size={30} color="black" />
                  <Text>Camera</Text>
                </TouchableOpacity>
                
              </View>
            </Modal>
          </Portal>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({


  // main container
  container: {
    flex: 1,
    backgroundColor: "white",
    // backgroundColor
  },

  // background curver image
  image: {
    width: '100%',
    height: '35%',
    resizeMode: 'cover',
  },

  // text over background image
  overlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    marginTop: 30,
  },

  // text style over background image
  title: {
    color: 'white',
    fontSize: 50,
    marginTop: 20,
  },

  // form container 
  form: {
    margin: 10,
  },

  // input spacing
  inp: {
    margin: 10,
  },

  // from text styling
  text: {
    marginLeft: 10,
    marginTop: 10,
  },

  // image icon adjust
  imgCon: {
    alignItems: "center",
    marginTop: -20,
  },


  /* react native paper modal styling*/

  modalContainer: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },


  selectIamgeModelContainer: {
    display: "flex",
    flexDirection: "row"
  },

  selectModeIcon: {
    alignItems: "center",
    marginRight: 20
    // marginTop: -20,
  },
});
