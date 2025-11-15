import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CadastroScreen from './screens/CadastroScreen';
import HomeScreen from './screens/HomeScreen';
import ElogiosScreen from './screens/ElogiosScreen';
import CapturaMidiaScreen from './screens/CapturaMidiaScreen';
import ServicosScreen from './screens/ServicosScreen';
import ComunicacaoScreen from './screens/ComunicacaoScreen';
import InformacoesScreen from './screens/InformacoesScreen';
import ParticipacaoScreen from './screens/ParticipacaoScreen';
import PrestacaoContasScreen from './screens/PrestacaoContasScreen';
import AdminPanelScreen from './screens/AdminPanelScreen';
import SobreScreen from './screens/SobreScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Cadastro"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Elogios" component={ElogiosScreen} />
        <Stack.Screen name="CapturaMidia" component={CapturaMidiaScreen} />
        <Stack.Screen name="Servicos" component={ServicosScreen} />
        <Stack.Screen name="Comunicacao" component={ComunicacaoScreen} />
        <Stack.Screen name="Informacoes" component={InformacoesScreen} />
        <Stack.Screen name="Participacao" component={ParticipacaoScreen} />
        <Stack.Screen name="PrestacaoContas" component={PrestacaoContasScreen} />
        <Stack.Screen name="AdminPanel" component={AdminPanelScreen} />
        <Stack.Screen name="Sobre" component={SobreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}