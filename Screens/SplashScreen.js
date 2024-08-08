import React, { useEffect } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'

export default function SplashScreen({ navigation }) {

    useEffect(() => {
        setTimeout(() => {
            navigation.replace("AppIntro")
        }, 3000);
    }, [])

    return (
        <>
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: "https://img.freepik.com/free-vector/connected-world-concept-illustration_114360-3027.jpg?ga=GA1.1.1778619907.1708775132&semt=sph" }} />
                <Text style={styles.text}>Welcome Back</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },

    image: {
        width: '88%',
        height: '70%',
    },

    text: {
        color: "black",
        fontSize: 25,
        fontFamily: "serif",
    }
})
