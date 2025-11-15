// screens/SobreScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function SobreScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sobre o PrefeituraApp</Text>
      <Text style={styles.text}>
        Este aplicativo foi desenvolvido para facilitar a comunicação entre os cidadãos e a prefeitura de Bom Conselho.
        Aqui você pode:
      </Text>
      <Text style={styles.lista}>• Enviar elogios e sugestões</Text>
      <Text style={styles.lista}>• Denunciar problemas com fotos</Text>
      <Text style={styles.lista}>• Acessar serviços online</Text>
      <Text style={styles.lista}>• Consultar notícias e transparência</Text>
      <Text style={styles.lista}>• Emitir Nota Fiscal Eletrônica</Text>
      <Text style={styles.lista}>• Agendar consultas e muito mais</Text>

      <Text style={styles.rodape}>
        Desenvolvido com carinho por @AdemirFerraz{'\n'}
        Versão 1.0.0 | 2025
      </Text>

      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Text style={styles.voltarText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#2c3e50', textAlign: 'center', marginBottom: 20 },
  text: { fontSize: 16, color: '#34495e', marginBottom: 15, lineHeight: 24 },
  lista: { fontSize: 15, color: '#2c3e50', marginLeft: 10, marginBottom: 8 },
  rodape: { fontSize: 14, color: '#7f8c8d', textAlign: 'center', marginTop: 30, fontStyle: 'italic' },
  voltar: { marginTop: 40, alignItems: 'center' },
  voltarText: { fontSize: 18, color: '#e74c3c', fontWeight: 'bold' },
});