import React, { useState } from 'react';
import { View, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

export default function SignUp({ navigation }) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [btnState, setbtnState] = useState(true)


    const signInuser = () => {
        const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === undefined) {
            errorMessageShow("error", "Email must be required")
        } else if (!regexForEmail.test(email)) {
            errorMessageShow("error", "Enter valid email")
        } else if (password === undefined) {
            errorMessageShow("error", "Password must be required")
        } else {
            setbtnState(false)
            auth().signInWithEmailAndPassword(email, password)
                .then(async (UserCredential) => {

                    let LoginuserID = UserCredential.user.uid;


                    database()
                        .ref(`Users/${LoginuserID}`)
                        .once('value')
                        .then(async snapshot => {
                            // console.log('User data: ', snapshot.val());
                            const LoginUserData = {
                                LoginUsername: snapshot.val().UserName,
                                LoginUserEmail: snapshot.val().UserEmail,
                                LoginUserpassword: snapshot.val().UserPassword,
                                LoginUserProfile: snapshot.val().UserProfile,

                            }

                             const jsonValue = JSON.stringify(LoginUserData);
                            //  console.log(jsonValue);
                            await AsyncStorage.setItem('LoginUserDetails', jsonValue);
                            errorMessageShow("success", 'User signed in!')
                            setbtnState(true)

                            setEmail("");
                            setPassword("");

                            navigation.navigate('Home')
                        })
                        .catch(error => {
                            setbtnState(true)
                            if (error.code === 'auth/email-already-in-use') {
                                errorMessageShow("error", 'That email address is already in use!')
                            }

                            if (error.code === 'auth/invalid-email') {
                                errorMessageShow("error", 'That email address is invalid!')
                            }
                            errorMessageShow("error", error.code)

                        });
                })

        }
    };

    const signUpPage = () => {
        navigation.navigate("SignUp")
    }

    const errorMessageShow = (type, text) => {
        Toast.show({
            position: 'bottom',
            type: type,
            text1: text,
        });
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <Image source={require("../Assets/BgSignIn.png")} style={styles.image} />
                    <View style={styles.overlay}>
                        <Text style={styles.title}>SIGN IN</Text>
                    </View>

                    <View style={styles.form}>
                        <TextInput style={styles.inp} mode='outlined' label="Email" value={email} onChangeText={(e) => { setEmail(e) }} />
                        <TextInput style={styles.inp} mode='outlined' label="Password" value={password} onChangeText={(e) => { setPassword(e) }} secureTextEntry={true} />

                        {
                            btnState ?
                                <TouchableOpacity onPress={() => signInuser()} style={styles.signupBtn}>
                                    <Text style={styles.signupBtnText}>Sign In</Text>
                                </TouchableOpacity>
                                :
                                <ActivityIndicator size={'medium'} animating={true} color={'#663399'} />
                        }

                        <TouchableOpacity onPress={() => signUpPage()} style={styles.signinBtn}>
                            <Text style={styles.signinBtnText}>Sign Up</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </SafeAreaView>
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
        height: 280,
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
        marginTop: 40,
    },
    form: {
        width: '90%',
        // marginTop: 10,
    },
    inp: {
        marginVertical: 10,
    },

    signupBtn: {
        elevation: 8,
        backgroundColor: "#663399",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 10
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
        marginVertical: 10,
        borderColor: "#663399",
        borderWidth: 1
    },

    signinBtnText: {
        fontSize: 18,
        color: "#663399",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",

    }
});
