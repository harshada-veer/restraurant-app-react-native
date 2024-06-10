import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';

const Menu = () => {
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState([true]);
    let ListviewRef;

    useEffect(() => {
        axios.get("https://82d90d35-091e-4fae-98da-8ea290c34dba.mock.pstmn.io/foodMenuList")
            .then((response) => {
                setData(response.data)
                setTimeout(() => {
                    setLoadingData(false);
                    setData(response.data);
                }, 2000)
            }
            ).catch(() => {
                alert("Something went wrong!")
            })
    }, []);

    const renderItemMenu = (itemData) => {
        return (
            <View style={styles.container}>
                <View>
                    <TouchableOpacity onPress={() => { Alert.alert('We will shortly connect with you, Thanks for reaching us! ') }}>
                        <Image source={{ uri: itemData.item.MenuImage }}
                            style={styles.burgers}>
                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.fontText}>
                    <Text style={styles.heading}>{itemData.item.MenuName}</Text>
                    <Text
                        style={styles.description}
                    >{itemData.item.MenuDiscription}</Text>
                </View>
            </View>
        )
    }

    const TopButtonHandler = () => {
        ListviewRef.scrollToOffset({ offset: 0, animated: true })

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
                <FlatList
                    ListHeaderComponent={
                        <Text style={styles.header}>Menu</Text>
                    }
                    data={data}
                    renderItem={renderItemMenu}
                    ref={(ref) => { ListviewRef = ref; }}
                    keyExtractor={(item) => item.MenuName}

                    ListFooterComponent={
                        <TouchableOpacity
                            style={styles.gotoTop}
                            onPress={TopButtonHandler}
                        >
                            <Text style={{ fontWeight: 'bold' }}>Back To Top</Text>
                        </TouchableOpacity>
                    }
                />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'relative',
        alignSelf: 'center',
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold',
        color: '#000000',
        borderWidth: 3,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#EFEAE4'
    },
    burgers: {
        height: 150,
        width: 150,
        borderRadius: 50,
        padding: 10,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    container: {
        borderWidth: 5,
        padding: 10,
        marginTop: 50,
        borderRadius: 20,
        margin: 2,
        justifyContent: 'space-between'
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    fontText: {
        padding: 5
    },
    activityIndicator: {
        marginTop: '80%'
    },
    gotoTop: {
        borderRadius: 1,
        margin: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 30,
        borderRadius: 10,
        height: 50,
        width: 100,
        padding: 10

    }
})

export default Menu;