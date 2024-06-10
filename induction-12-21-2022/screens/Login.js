import React from 'react';
import { View, SafeAreaView, Image, TextInput, Button, Text, TouchableOpacity, StyleSheet, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

const Login = (props) => {
  const { navigation } = props
  const { height } = useWindowDimensions();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [loaderBeforeLogin, setLoaderBeforeLogin] = useState(false);

  const loggedIn = async () => {
    setLoader(true)
    const tokenUser = await AsyncStorage.getItem('TOKEN')
    if (tokenUser !== null) {
      setLoader(false)
      navigation.dispatch(
        StackActions.replace('Home')
      )
    } else {
      setLoader(false)
    }
  }

  useEffect(() => {
    loggedIn()
  }, [])

  const getData = () => {
    try {
      setLoaderBeforeLogin(true)
      axios.post('https://reqres.in/api/login', { email: name, password: password })
        .then(async (response) => {
          if (response.status == 200) {
            await AsyncStorage.setItem('NAME', name);
            await AsyncStorage.setItem('PASSWORD', password);
            await AsyncStorage.setItem('TOKEN', response.data.token)
            setLoaderBeforeLogin(false)
            navigation.dispatch(
              StackActions.replace('Home')
            )
          }
        }
        ).catch((error) => {
          setLoaderBeforeLogin(false)
          alert(error.response.data.error)
        })
    } catch (error) {
      alert("Something Went wrong!")
    }
  }

  return (
    <KeyboardAwareScrollView
    enableAutomaticScroll={true}
    showsVerticalScrollIndicator={false}
    enableOnAndroid={true}
    keyboardShouldPersistTaps='handled'
      >
      <SafeAreaView style={[styles.containerSafe, {height:height}]}>
        {loader ?
          <View style={[styles.ActView, { backgroundColor: 'rgba(0,0,0,0.7)' }]}>
            <ActivityIndicator size="large" color="black" animating={true} />
          </View>
          :
          <>
            <View>
              <Image source={require('/Users/ma-48/Desktop/BeforeStack/Images/Login.webp')}
                style={styles.LoginImg}
              />
              <TextInput
                placeholder='Email'
                textAlign='auto'
                returnKeyType='done'
                style={styles.mail}
                onChangeText={(value) => setName(value)}
                keyboardType='email-address'
              />
              <TextInput
                placeholder='Password'
                textAlign='auto'
                returnKeyType='go'
                onSubmitEditing={getData}
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                style={styles.password}
                onChangeText={(value) => setPassword(value)}
              />
              <View>
                <TouchableOpacity style={styles.appButton}
                  onPress={getData}>
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

              </View>
            </View>
            {loaderBeforeLogin &&
              <View style={[styles.ActView, { position: 'absolute', backgroundColor: 'rgba(0,0,0,0.4)', height: '100%', width: '100%' }]}>
                <ActivityIndicator size="large" color="black" animating={true} />
              </View>
            }
          </>
        }
      </SafeAreaView>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  containerSafe: {
    backgroundColor: '#ffffff'
  },
  password: {
    padding: 10,
    borderWidth: 2,
    margin: 10,
    borderRadius: 35,
    fontFamily: 'serif',
    borderColor: '#000000',
    backgroundColor: '#fffafa',
    fontSize: 20,
    textAlign: 'center'
  },
  mail: {
    padding: 10,
    borderWidth: 2,
    margin: 10,
    borderRadius: 35,
    fontFamily: 'serif',
    borderColor: '#000000',
    backgroundColor: '#fffafa',
    fontSize: 20,
    textAlign: 'center'
  },
  textOp: {
    marginLeft: 20,
    alignSelf: 'center',
    paddingTop: 20
  },
  ActView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  LoginImg: {
    justifyContent: 'center',
    height: 410,
    width: 400,
    alignSelf: 'center'
  },
  appButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor:'#000000',
    borderRadius:20
  },
  buttonText: {
    width: 100,
    color: '#ffffff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 7,
    textAlign: 'center',
    borderColor: '#000000',
    borderRadius:20,
    textAlign:'center'
  }
})

export default Login;