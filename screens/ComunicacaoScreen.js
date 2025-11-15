// screens/ComunicacaoScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function ComunicacaoScreen({ navigation }) {
  const noticias = [
    { titulo: "Prefeitura inicia obra na Av. Principal", data: "12/11/2025" },
    { titulo: "Vacinação contra dengue começa segunda", data: "11/11/2025" },
    { titulo: "Feira de artesanato neste sábado", data: "10/11/2025" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Comunicação</Text>
      <Text style={styles.subtitle}>Fique por dentro das novidades</Text>

      {noticias.map((n, i) => (
        <View key={i} style={styles.noticia}>
          <Text style={styles.noticiaTitulo}>{n.titulo}</Text>
          <Text style={styles.noticiaData}>{n.data}</Text>
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
  noticia: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 12, elevation: 2 },
  noticiaTitulo: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' },
  noticiaData: { fontSize: 12, color: '#999', marginTop: 5 },
  voltar: { marginTop: 30, alignItems: 'center' },
  voltarText: { fontSize: 18, color: '#e74c3c', fontWeight: 'bold' },
});