import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function AdminLoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username.trim() || !password) {
      Alert.alert('Erro', 'Informe usuário e senha');
      return;
    }

    const isEmail = (s) => /\S+@\S+\.\S+/.test(s);
    if (!isEmail(username.trim())) {
      Alert.alert('Erro', 'Informe um e-mail válido para administrador');
      return;
    }

    try {
      // check if there are any admins at all
      const adminsSnapshot = await getDocs(collection(db, 'admins'));
      if (adminsSnapshot.empty) {
        // create first admin in Firebase Auth and link to admins collection
        const email = username.trim();
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCred.user.uid;
        const docRef = await addDoc(collection(db, 'admins'), {
          uid,
          email,
          role: 'admin',
          createdAt: new Date().toISOString(),
        });
        await AsyncStorage.setItem('adminData', JSON.stringify({ id: docRef.id, uid, email }));
        Alert.alert('Administrador criado', 'Primeiro administrador criado com sucesso.');
        navigation.replace('AdminPanel');
        return;
      }

      // normal login via Firebase Auth
      const email = username.trim();
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      const q = query(collection(db, 'admins'), where('uid', '==', uid));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        Alert.alert('Erro', 'Conta autenticada, mas sem permissão de administrador.');
        return;
      }
      const docSnap = snapshot.docs[0];
      const data = docSnap.data();

      // success
      await AsyncStorage.setItem('adminData', JSON.stringify({ id: docSnap.id, uid, email }));
      navigation.replace('AdminPanel');
    } catch (error) {
      console.error('Admin login error:', error);
      Alert.alert('Erro', 'Falha ao autenticar admin.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Admin</Text>
  <TextInput style={styles.input} placeholder="E-mail" value={username} onChangeText={setUsername} keyboardType="email-address" autoCapitalize="none" />
  <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.btn} onPress={handleLogin}><Text style={styles.btnText}>Entrar</Text></TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 12 }} onPress={() => navigation.goBack()}>
        <Text style={{ color: '#1565c0' }}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  input: { backgroundColor: '#f2f8ff', padding: 12, borderRadius: 8, marginBottom: 10 },
  btn: { backgroundColor: '#0077cc', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
});
