import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Menu from '../screens/Menu';
import Profilepage from '../screens/Profilepage';

const Stack = createNativeStackNavigator();

const Navigation = (navigation) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name="Login" component={Login}
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name="Home"
          component={Home} />
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name="Profilepage" component={Profilepage} />
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name="Menu" component={Menu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;