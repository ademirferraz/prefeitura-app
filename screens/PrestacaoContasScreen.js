// screens/PrestacaoContasScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function PrestacaoContasScreen({ navigation }) {
  const dados = [
    { item: "Saúde", valor: "R$ 12.500.000", porcentagem: "35%" },
    { item: "Educação", valor: "R$ 9.800.000", porcentagem: "27%" },
    { item: "Obras", valor: "R$ 7.200.000", porcentagem: "20%" },
    { item: "Administração", valor: "R$ 6.500.000", porcentagem: "18%" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Prestação de Contas</Text>
      <Text style={styles.subtitle}>Transparência total</Text>

      {dados.map((d, i) => (
        <View key={i} style={styles.linha}>
          <View style={styles.barraContainer}>
            <View style={[styles.barra, { width: d.porcentagem }]} />
          </View>
          <Text style={styles.texto}>{d.item}: {d.valor} ({d.porcentagem})</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Text style={styles.voltarText}>← Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#2c3e50', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#7f8c8d', textAlign: 'center', marginBottom: 20 },
  linha: { marginBottom: 15 },
  barraContainer: { height: 30, backgroundColor: '#ddd', borderRadius: 15, overflow: 'hidden', marginBottom: 5 },
  barra: { height: '100%', backgroundColor: '#2ecc71' },
  texto: { fontSize: 16, color: '#34495e', fontWeight: '500' },
  voltar: { marginTop: 40, alignItems: 'center' },
  voltarText: { fontSize: 18, color: '#e74c3c', fontWeight: 'bold' },
});