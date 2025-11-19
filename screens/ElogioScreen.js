import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export default function ElogioScreen({ navigation }) {
  const [texto, setTexto] = useState('');
  const [charCount, setCharCount] = useState(0);
  const MAX = 32000;

  useEffect(() => {
    setCharCount(texto.length);
  }, [texto]);

  const enviarElogio = async () => {
    if (!texto.trim()) {
      Alert.alert('Erro', 'Escreva algo antes de enviar.');
      return;
    }

    try {
      const userJson = await AsyncStorage.getItem('userData');
      const user = userJson ? JSON.parse(userJson) : null;

      await addDoc(collection(db, 'elogios'), {
        texto: texto.trim(),
        autorId: user?.id || null,
        autorNome: user?.nome || null,
        status: 'pendente_moderação',
        createdAt: new Date().toISOString(),
      });

      Alert.alert('Sucesso', 'Elogio enviado. Obrigado!');
      setTexto('');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao enviar elogio:', error);
      Alert.alert('Erro', 'Não foi possível enviar. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enviar Elogio</Text>
      <Text style={styles.helper}>Campo com suporte até {MAX} caracteres.</Text>

      <TextInput
        style={[styles.input, { height: 200 }]}
        placeholder="Escreva seu elogio aqui..."
        value={texto}
        onChangeText={(t) => setTexto(t.slice(0, MAX))}
        multiline
        textAlignVertical="top"
      />

      <Text style={styles.counter}>{charCount}/{MAX}</Text>

      <TouchableOpacity style={styles.btn} onPress={enviarElogio}>
        <Text style={styles.btnText}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Text style={styles.voltarText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  helper: { color: '#666', marginBottom: 8 },
  input: { backgroundColor: '#f7fbff', padding: 12, borderRadius: 8, fontSize: 16 },
  counter: { textAlign: 'right', color: '#999', marginTop: 6 },
  btn: { backgroundColor: '#0077cc', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  btnText: { color: '#fff', fontWeight: '700' },
  voltar: { marginTop: 12, alignItems: 'center' },
  voltarText: { color: '#1565c0' },
});
