import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profilepage = (props) => {
    const { navigation } = props
    const [namedisplay, setNamedisplay] = useState();

    const profileName = async () => {
        const nameProfile = await AsyncStorage.getItem('NAME');
        setNamedisplay(nameProfile.split("@")[0])
    }

    useEffect(() => {
        profileName();
    }, [])

    const removeData = async () => {
        try {
            await AsyncStorage.removeItem('TOKEN');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }]
            })
        } catch (error) {
            return false;
        }
    }

    const BackToHome = () => {
        navigation.navigate('Home')
    }

    return (
        <View>
            <Text
                style={styles.myPro}
            >My Profile</Text>
            <Image
                style={styles.profile}
                source={require('../Images/profile.png')} />
            <Text
                style={styles.helloName}
            >Hello {namedisplay}!</Text>
            <Text style={styles.MsgText}>
                Do you want to Logout?
            </Text>
            <View style={{
                justifyContent: 'space-evenly',
                flexDirection: 'row',
                marginHorizontal: 100
            }}>
                <TouchableOpacity
                    onPress={removeData}>
                    <Text style={styles.button2}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={BackToHome}>
                    <Text style={styles.button}>No</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    myPro: {
        fontSize: 30,
        alignSelf: 'center',
        padding: 20,
        fontWeight: 'bold',
        color: '#000000'
    },
    profile: {
        height: 200,
        width: 200,
        alignSelf: 'center'
    },
    button2: {
        alignSelf: 'center',
        fontSize: 20,
        borderWidth: 1,
        padding: 7,
        paddingHorizontal: 15,
        borderRadius: 5,
        backgroundColor: '#056da7',
        color: '#FFFFFF',
        borderColor: '#FFFFFF'
    },
    button: {
        alignSelf: 'center',
        fontSize: 20,
        borderWidth: 1,
        padding: 7,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderColor: '#056da7',
        color: '#056da7'
    },
    helloName: {
        fontSize: 35,
        alignSelf: 'center',
        padding: 20
    },
    MsgText: {
        fontSize: 25,
        alignSelf: 'center',
        padding: 20
    }
})

export default Profilepage;