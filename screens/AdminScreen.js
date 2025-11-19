// screens/AdminPanel.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AdminPanel() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PAINEL DO ADMINISTRADOR</Text>
      <Text style={styles.welcome}>Bem-vindo, Ademir!</Text>
      <Text style={styles.info}>Aqui você pode gerar escalas, ver relatórios, etc.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e6f7ff', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#0066cc', textAlign: 'center', marginBottom: 20 },
  welcome: { fontSize: 18, textAlign: 'center', marginBottom: 10 },
  info: { fontSize: 16, textAlign: 'center', color: '#555' },
});