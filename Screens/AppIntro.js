import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const slides = [
    {
        key: 1,
        text: 'Winter Season',
        image: "https://img.freepik.com/premium-photo/online-fashion-shopping-collage_23-2150535821.jpg?ga=GA1.1.1778619907.1708775132&semt=ais_hybrid",
        backgroundColor: '#59b2ab',
    },
    {
        key: 2,
        text: 'Find cool stuff',
        image: "https://img.freepik.com/premium-photo/full-shot-man-online-shopping_23-2150567505.jpg?ga=GA1.1.1778619907.1708775132&semt=ais_hybrid",
        backgroundColor: '#febe29',
    },
    {
        key: 3,
        text: 'Collect Your Favourite Clothes',
        image: 'https://img.freepik.com/premium-photo/miniature-house-shopping-cart-real-estate-investment-concept_1080455-4571.jpg?ga=GA1.1.1778619907.1708775132&semt=ais_hybrid',
        backgroundColor: '#22bcb5',
    }
];

const AppIntro = ({navigation}) => {
    // const navigation = useNavigation();

    useEffect(() => {
        setStorage();
        console.log("useEffect app intro run");
    }, []);

    const setStorage = async () => {
        await AsyncStorage.setItem('show', 'true');
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.overlay}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.text}>{item.text}</Text>
                </View>
            </View>
        );
    };

    const renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Text style={styles.buttonText}>Next</Text>
            </View>
        );
    };

    const renderSkipButton = () => {
        return (
            <View style={styles.skipButton}>
                <Text style={styles.buttonText}>Skip</Text>
            </View>
        );
    };

    const renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Text style={styles.buttonText}>Done</Text>
            </View>
        );
    };

    const onDone = () => {
        console.log("press");
        
        navigation.replace('SignUp'); // Navigate to the SignUp screen
        console.log("press");
    };

    return (
        <AppIntroSlider
            renderItem={renderItem}
            data={slides}
            showSkipButton={true}
            renderNextButton={renderNextButton}
            renderSkipButton={renderSkipButton}
            renderDoneButton={renderDoneButton}
            onDone={onDone} // Set the onDone prop
            activeDotStyle={{
                backgroundColor: "blue"
            }}
            dotStyle={{
                backgroundColor: "white"
            }}
        />
    );
};

export default AppIntro;

const styles = StyleSheet.create({
    slide: {
        backgroundColor: "grey",
        flex: 1
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 35,
        color: 'white',
        marginBottom: 16,
        fontWeight: "bold"
    },
    text: {
        fontSize: 30,
        color: 'grey',
        textAlign: 'center',
        fontStyle: "italic",
        fontWeight: "bold",
        fontFamily: ""
    },
    overlay: {
        position: 'absolute',
        top: -30,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonCircle: {
        width: 60,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    skipButton: {
        width: 60,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});
