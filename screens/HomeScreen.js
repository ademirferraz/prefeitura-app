// screens/HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const abrirNotaFiscal = () => {
    Linking.openURL('https://www.tributosmunicipais.com.br/NFE-bomconselho/');
  };

  const menu = [
    { nome: 'Elogios', icone: 'thumbs-up', tela: 'Elogios' },
    { nome: 'Captura de Mídia', icone: 'camera', tela: 'CapturaMidia' },
    { nome: 'Serviços Online', icone: 'apps', tela: 'Servicos' },
    { nome: 'Comunicação', icone: 'chatbubble', tela: 'Comunicacao' },
    { nome: 'Informações', icone: 'information-circle', tela: 'Informacoes' },
    { nome: 'Participação', icone: 'people', tela: 'Participacao' },
    { nome: 'Prestação de Contas', icone: 'cash', tela: 'PrestacaoContas' },
    { nome: 'Nota Fiscal Eletrônica', icone: 'receipt', acao: abrirNotaFiscal },
     { nome: 'Sobre o App', icone: 'information-circle', tela: 'Sobre' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>App da Prefeitura</Text>
      <View style={styles.grid}>
        {menu.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.card}
            onPress={() => item.acao ? item.acao() : navigation.navigate(item.tela)}
          >
            <Ionicons name={item.icone} size={40} color="#2ecc71" />
            <Text style={styles.cardText}>{item.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#2c3e50' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', padding: 10 },
  card: { width: '40%', backgroundColor: '#fff', padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 15, elevation: 3 },
  cardText: { marginTop: 10, fontWeight: '600', color: '#34495e' },
});