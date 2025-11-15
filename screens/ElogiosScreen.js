// ElogiosScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function ElogiosScreen({ navigation }) {
  const [texto, setTexto] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elogios ao Prefeito</Text>
      <TextInput style={styles.textArea} placeholder="Escreva seu elogio (máx. 32.000 caracteres)" multiline value={texto} onChangeText={setTexto} maxLength={32000} />
      <TouchableOpacity style={styles.btn} onPress={() => { Alert.alert("Enviado!", "Elogio recebido com sucesso!"); setTexto(''); }}>
        <Text style={styles.btnText}>Enviar Elogio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}><Text style={styles.voltarText}>Voltar</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#2c3e50' },
  textArea: { backgroundColor: '#fff', height: 200, textAlignVertical: 'top', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 15 },
  btn: { backgroundColor: '#2ecc71', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  voltar: { marginTop: 20, alignItems: 'center' },
  voltarText: { color: '#3498db', textDecorationLine: 'underline' },
});