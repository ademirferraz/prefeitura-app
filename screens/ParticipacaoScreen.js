// screens/ParticipacaoScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function ParticipacaoScreen({ navigation }) {
  const [tipo, setTipo] = useState('denuncia');
  const [texto, setTexto] = useState('');

  const enviar = () => {
    if (!texto.trim()) return Alert.alert("Erro", "Escreva algo");
    Alert.alert("Enviado!", `${tipo === 'denuncia' ? 'Denúncia' : 'Sugestão'} recebida!`);
    setTexto('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Participação Cidadã</Text>

      <View style={styles.segment}>
        <TouchableOpacity style={[styles.segmentBtn, tipo === 'denuncia' && styles.active]} onPress={() => setTipo('denuncia')}>
          <Text style={[styles.segmentText, tipo === 'denuncia' && styles.activeText]}>Denúncia</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.segmentBtn, tipo === 'sugestao' && styles.active]} onPress={() => setTipo('sugestao')}>
          <Text style={[styles.segmentText, tipo === 'sugestao' && styles.activeText]}>Sugestão</Text>
        </TouchableOpacity>
      </View>

      <TextInput style={styles.textArea} placeholder={`Escreva sua ${tipo}...`} multiline value={texto} onChangeText={setTexto} />

      <TouchableOpacity style={styles.btn} onPress={enviar}>
        <Text style={styles.btnText}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Text style={styles.voltarText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#2c3e50', textAlign: 'center', marginBottom: 20 },
  segment: { flexDirection: 'row', marginBottom: 20 },
  segmentBtn: { flex: 1, padding: 12, backgroundColor: '#ddd', alignItems: 'center' },
  active: { backgroundColor: '#2ecc71' },
  segmentText: { fontWeight: 'bold' },
  activeText: { color: '#fff' },
  textArea: { backgroundColor: '#fff', height: 150, padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#ddd', textAlignVertical: 'top', marginBottom: 15 },
  btn: { backgroundColor: '#2ecc71', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  voltar: { marginTop: 30, alignItems: 'center' },
  voltarText: { fontSize: 18, color: '#e74c3c', fontWeight: 'bold' },
});