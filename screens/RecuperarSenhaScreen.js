import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const RecuperarSenhaScreen = ({ navigation }) => {
  const [ultimos4CPF, setUltimos4CPF] = useState('');
  const [verifiedUserId, setVerifiedUserId] = useState(null);
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmNovaSenha, setConfirmNovaSenha] = useState('');

  const onlyDigits = (text) => text.replace(/\D/g, '');

  const passwordIsStrong = (value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(value);
  };

  // SHA-256 using crypto-js
  const SHA256 = require('crypto-js/sha256');
  const hash256 = (str) => SHA256(str).toString();

  const verificarUltimos4 = async () => {
    const digits = onlyDigits(ultimos4CPF);
    if (digits.length !== 4) {
      Alert.alert('Erro', 'Digite os 4 últimos dígitos do CPF.');
      return;
    }

    try {
      const q = query(collection(db, 'users'), where('cpfLast4', '==', digits));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        Alert.alert('Não encontrado', 'Nenhum usuário encontrado com esses 4 dígitos.');
        return;
      }
      if (snapshot.size > 1) {
        // Situação inesperada: mais de um usuário com mesmos 4 últimos dígitos
        Alert.alert('Atenção', 'Foram encontrados vários usuários com esses dígitos. Entre em contato com o suporte.');
        return;
      }

      const docSnap = snapshot.docs[0];
      setVerifiedUserId(docSnap.id);
      Alert.alert('Verificado', 'Digite sua nova senha abaixo.');
    } catch (error) {
      console.error('Erro ao verificar CPF:', error);
      Alert.alert('Erro', 'Não foi possível verificar. Tente novamente.');
    }
  };

  const redefinirSenha = async () => {
    if (!verifiedUserId) {
      Alert.alert('Erro', 'Primeiro verifique os 4 últimos dígitos do CPF.');
      return;
    }
    if (!passwordIsStrong(novaSenha)) {
      Alert.alert('Erro', 'Senha fraca. Deve ter mínimo 6 caracteres, 1 maiúscula, 1 minúscula e 1 número.');
      return;
    }
    if (novaSenha !== confirmNovaSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
  const passwordHash = hash256(novaSenha);
      const userRef = doc(db, 'users', verifiedUserId);
      await updateDoc(userRef, { passwordHash });
      Alert.alert('Sucesso', 'Senha redefinida com sucesso. Faça login com sua nova senha.');
      navigation.replace('Login');
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      Alert.alert('Erro', 'Não foi possível redefinir a senha. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>
      <Text style={styles.info}>Digite os últimos 4 dígitos do seu CPF</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 1234"
        value={ultimos4CPF}
        onChangeText={(t) => setUltimos4CPF(t.replace(/\D/g, '').slice(0, 4))}
        keyboardType="numeric"
        maxLength={4}
      />

      <TouchableOpacity style={styles.btn} onPress={verificarUltimos4}>
        <Text style={styles.btnText}>Verificar</Text>
      </TouchableOpacity>

      {verifiedUserId && (
        <>
          <Text style={[styles.info, { marginTop: 20 }]}>Usuário verificado — informe a nova senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Nova senha"
            value={novaSenha}
            onChangeText={setNovaSenha}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar nova senha"
            value={confirmNovaSenha}
            onChangeText={setConfirmNovaSenha}
            secureTextEntry
          />
          <TouchableOpacity style={styles.btn} onPress={redefinirSenha}>
            <Text style={styles.btnText}>Redefinir Senha</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f8f9fa' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  info: { textAlign: 'center', marginBottom: 20, color: '#7f8c8d' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, textAlign: 'center', fontSize: 18, letterSpacing: 5 },
  btn: { backgroundColor: '#3498db', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#fff', fontWeight: 'bold' },
});

export default RecuperarSenhaScreen;