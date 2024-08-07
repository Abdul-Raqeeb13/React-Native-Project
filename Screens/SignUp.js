import React, { useState } from 'react';
import { View, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Modal, Portal, Text, Provider as PaperProvider, TextInput, Button } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

export default function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [image, setImage] = useState("");

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [file, setfile] = useState("");

  const openCamera = () => {
    setVisible(false);
    const option = {
      mediaType: 'photo',
      quality: 0.8
    };

    launchCamera(option, (response) => {
      if (response.didCancel) {
        console.log('User cancelled the camera.');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        console.log('Image URI camera: ', response.assets[0].uri);
        setImage(response.assets[0].uri);
      }
    });
  };

  const openImageGallery = () => {
    setVisible(false);
    const option = {
      mediaType: 'photo',
      quality: 0.8
    };

    launchImageLibrary(option, (response) => {
      if (response.didCancel) {
        console.log('User cancelled the camera.');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        console.log('Image URI: ', response.assets[0].uri);
        setImage(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async () => {
    const reference = storage().ref('User Profile');
    await reference.putFile(image);
    const url = await reference.getDownloadURL();

    console.log("Download URL", url);
    return url;
  };

  const signUpuser = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === undefined) {
      console.warn("Name must be required");
    } else if (email === undefined) {
      console.warn("Email must be required");
    } else if (!regex.test(email)) {
      console.warn("Enter valid email");
    } else if (password === undefined) {
      console.warn("Password must be required");
    } else {
      auth().createUserWithEmailAndPassword(email, password)
        .then(async (UserCredential) => {
          var ProFileLink = await uploadImage();

          var userData = {
            UserName: name,
            UserEmail: email,
            UserPassword: password,
            UserProfile: ProFileLink,
            UserID: UserCredential.user.uid
          };

          const reference = database().ref(`Users/${UserCredential.user.uid}`);
          await reference.set(userData);

          console.warn('User account created & signed in!');
          setName("");
          setEmail("");
          setPassword("");
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.warn('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.warn('That email address is invalid!');
          }

          console.error(error);
        });
    }
  };

  return (
    <>
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Image source={require("../Assets/BgCover.png")} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.title}>SIGN UP</Text>
            </View>

            <View style={styles.form}>
              <TextInput style={styles.inp} mode='outlined' label="Name" value={name} onChangeText={(e) => { setName(e) }} />
              <TextInput style={styles.inp} mode='outlined' label="Email" value={email} onChangeText={(e) => { setEmail(e) }} />
              <TextInput style={styles.inp} mode='outlined' label="Password" value={password} onChangeText={(e) => { setPassword(e) }} />
              <Text style={styles.text}>Upload Image</Text>
              <TouchableOpacity style={styles.imgView} onPress={showModal}>
                {
                  image === "" ?
                    <TouchableOpacity style={styles.imgCon} onPress={showModal}>
                      <FeatherIcon name="image" size={30} color="black" />
                    </TouchableOpacity> :
                    <Image
                      style={styles.Image1}
                      source={{ uri: image }}
                      resizeMode={"cover"}
                    />
                }
              </TouchableOpacity>

              <TouchableOpacity onPress={() => signUpuser()} style={styles.signupBtn}>
                <Text style={styles.signupBtnText}>Sign Up</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.signinBtn}>
                <Text style={styles.signinBtnText}>Sign In</Text>
              </TouchableOpacity>

              <Portal>
                <Modal
                  visible={visible}
                  onDismiss={hideModal}
                  contentContainerStyle={styles.modalContainer}
                >
                  <View style={styles.selectImageModelContainer}>
                    <TouchableOpacity style={styles.selectModeIcon} onPress={() => openImageGallery()}>
                      <MaterialIcon name="image" size={30} color="black" />
                      <Text>Gallery</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.selectModeIcon} onPress={() => openCamera()}>
                      <MaterialIcon name="camera" size={30} color="black" />
                      <Text>Camera</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </Portal>
            </View>
          </ScrollView>
        </SafeAreaView>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    // flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    color: 'white',
    fontSize: 50,
    marginTop: 20,
  },
  form: {
    width: '90%',
    marginTop: -10,
  },
  inp: {
    marginVertical: 10,
  },
  text: {
    marginLeft: 10,
    marginTop: 10,
  },
  imgCon: {
    alignItems: "center",
    marginTop: -50,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  selectImageModelContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  selectModeIcon: {
    alignItems: "center",
  },
  imgView: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  Image1: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },

  signupBtn : {
    elevation: 8,
    backgroundColor: "#663399",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  signupBtnText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },

  signinBtn: {
    elevation: 8,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical : 10,
    borderColor:"#663399",
    borderWidth:1
  },

  signinBtnText: {
    fontSize: 18,
    color: "#663399",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
   
  }
});
