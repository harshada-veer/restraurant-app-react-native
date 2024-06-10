import React from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, Linking, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { useState, useEffect } from 'react'
import axios from 'axios';

const Home = (props) => {
    const { navigation } = props
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        axios.get("https://82d90d35-091e-4fae-98da-8ea290c34dba.mock.pstmn.io/getRestaurantListNew")
            .then((response) => {
                setData(response.data)
                setTimeout(() => {
                    setLoadingData(false);
                    setData(response.data);
                })
            }
            ).catch(() => {
                setLoadingData(false),
                    alert("Something went wrong! Try again")
            }
            );
    }, []);

    const renderItem = (itemData) => {

        const OpenDialScreen = () => {
            let number = `tel:${itemData.item.Mobile}`
            Linking.openURL(number);
        };

        const OpenMaps = () => {
            let MapsGeo = `geo:${itemData.item.RestaurantLatitude},${itemData.item.RestaurantLongitude}`
            Linking.openURL(MapsGeo);
        }

        const OpenEmail = () => {
            let EmailGo = `${itemData.item.Email}`
            let GoToEmail=EmailGo.split(":")[1]
            Linking.openURL(`mailto:${GoToEmail}`)
        }

        return (
            <View style={[styles.poster, styles.elevation]}>
                <View style={styles.container}>
                    <View style={styles.viewContent}>
                        <Text style={styles.nameRes}>{itemData.item.RestaurantName}</Text>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                                <Image
                                    source={{ uri: itemData.item.RestaurantImage }}
                                    style={styles.pizza}
                                ></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Image source={require('../Images/price.webp')}
                                style={styles.price}>
                            </Image>
                            <Text style={{ fontSize: 45 }}>{'\u20B9'}{itemData.item.AverageCost}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <TouchableOpacity onPress={OpenMaps}>
                                <Image source={require('../Images/Location.jpeg')}
                                    style={styles.location}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <TouchableOpacity onPress={OpenEmail}>
                                <Image source={require('/Users/ma-48/Desktop/BeforeStack/Images/Mail.png')}
                                    style={styles.mail}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={OpenDialScreen}>
                                <Image source={require('/Users/ma-48/Desktop/BeforeStack/Images/Call.webp')}
                                    style={styles.call}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView>
            {loadingData ?
                <View style={styles.activityIndicator}>
                    <ActivityIndicator size="large" color="black" />
                    <Text style={{
                        fontSize: 20,
                        color: 'black',
                        alignSelf: 'center'
                    }}>Loading Data...</Text>
                </View>
                :
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                >
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Profilepage')}>
                            <Image
                                style={styles.profile}
                                source={require('../Images/profile.png')} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.headerRes}>Restaurant List</Text>
                    </View>
                    <FlatList
                        horizontal
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.RestaurantName}
                    />
                </ScrollView>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerRes: {
        position: 'relative',
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000000',
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f7f7f7'
    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 30,
        marginBottom: 20,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    nameRes: {
        fontSize: 30,
        marginBottom: 20,
        marginLeft: 20,
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    name: {
        textAlign: 'center',
        fontFamily: 'sans-serif',
        position: 'relative'
    },
    price: {
        height: 50,
        width: 50,
        borderRadius: 20
    },
    pizza: {
        height: 300,
        width: 300,
        borderRadius: 20
    },
    location: {
        height: 50,
        width: 50,
        borderRadius: 20
    },
    mail: {
        height: 50,
        width: 50,
        borderRadius: 20
    },
    call: {
        height: 50,
        width: 50,
        borderRadius: 20
    },
    poster: {
        width: 350,
        alignItems: 'center',
        marginTop: 30,
        alignContent: 'center',
        borderRadius: 20,
        marginBottom: 30,
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: '#f7f7f7',
        borderColor: '#000000',
        alignSelf: 'center',
        margin: 10
    },
    elevation: {
        shadowColor: '#000000',
        elevation: 20,
        shadowOpacity: 1,
        shadowRadius: 3
    },
    profile: {
        height: 60,
        width: 60,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 30,
        padding: 10,
        margin: 3,
        left: 0,
        top: 0
    },
    containerHome: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    activityIndicator: {
        marginTop: '80%'
    }
})

export default Home;