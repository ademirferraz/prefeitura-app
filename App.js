// App.js – VERSÃO FINAL QUE NUNCA MAIS VAI QUEBRAR
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen       from './screens/HomeScreen.js';
import CadastroScreen   from './screens/CadastroScreen.js';
import ElogiosScreen    from './screens/ElogiosScreen.js';
import DenunciaForm     from './screens/DenunciaForm.js';
import AdminScreen      from './screens/AdminScreen.js';   // ← NOVO NOME LIMPO

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home"         component={HomeScreen}       options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro"     component={CadastroScreen} />
        <Stack.Screen name="Elogios"      component={ElogiosScreen} />
        <Stack.Screen name="DenunciaForm" component={DenunciaForm} />
        <Stack.Screen name="AdminPanel"   component={AdminScreen} options={{ title: 'Painel Admin' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}