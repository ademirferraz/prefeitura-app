// screens/AdminPanelScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

export default function AdminPanelScreen({ navigation }) {
  const [noticia, setNoticia] = useState('');
  const [horario, setHorario] = useState('');

  const salvarNoticia = () => {
    if (!noticia.trim()) return Alert.alert("Erro", "Escreva a notícia");
    Alert.alert("Salvo!", "Notícia publicada com sucesso!");
    setNoticia('');
  };

  const salvarHorario = () => {
    if (!horario.trim()) return Alert.alert("Erro", "Escreva o horário");
    Alert.alert("Salvo!", "Horário atualizado!");
    setHorario('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Painel do Admin</Text>
      <Text style={styles.subtitle}>Acesso restrito</Text>
       <Text style={styles.title} onPress={handleAdminClick}>Criar Conta</Text>

      <Text style={styles.label}>Nova Notícia</Text>
      <TextInput style={styles.input} placeholder="Título da notícia" value={noticia} onChangeText={setNoticia} />
      <TouchableOpacity style={styles.btn} onPress={salvarNoticia}>
        <Text style={styles.btnText}>Publicar Notícia</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Horário de Atendimento</Text>
      <TextInput style={styles.input} placeholder="Ex: 08h às 17h" value={horario} onChangeText={setHorario} />
      <TouchableOpacity style={styles.btn} onPress={salvarHorario}>
        <Text style={styles.btnText}>Atualizar Horário</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Text style={styles.voltarText}>← Sair do Painel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2c3e50', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#ecf0f1', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#bdc3c7', textAlign: 'center', marginBottom: 30 },
  label: { fontSize: 18, color: '#ecf0f1', marginBottom: 8, fontWeight: '600' },
  input: { backgroundColor: '#34495e', color: '#fff', padding: 15, borderRadius: 10, marginBottom: 15 },
  btn: { backgroundColor: '#e74c3c', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  voltar: { marginTop: 40, alignItems: 'center' },
  voltarText: { fontSize: 18, color: '#f1c40f', fontWeight: 'bold' },
});