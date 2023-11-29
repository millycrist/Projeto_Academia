// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import login from './screens/login';
import matricula from './screens/matricula';
import saude from './screens/saude';
import resultado from './screens/resultado';
import plano from './screens/plano';
import treino from './screens/treino';

const Stack = createStackNavigator();
  
export default function App() {  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="matricula" component={matricula} />
        <Stack.Screen name="saude" component={saude} />
        <Stack.Screen name="resultado" component={resultado} />
        <Stack.Screen name="plano" component={plano} />
        <Stack.Screen name="treino" component={treino} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
