// screens/CadastroScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export default function CadastroScreen() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');

  const passwordIsStrong = (value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(value);
  };

  const onlyDigits = (text) => text.replace(/\D/g, '');

  const formatCpfInput = (text) => {
    const d = onlyDigits(text).slice(0, 11);
    let out = d;
    if (d.length > 9) out = d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    else if (d.length > 6) out = d.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    else if (d.length > 3) out = d.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    setCpf(out);
  };

  // SHA-256 hash using crypto-js
  const SHA256 = require('crypto-js/sha256');
  const hash256 = (str) => SHA256(str).toString();

  const validarCpf = (value) => {
    const digits = onlyDigits(value);
    return digits.length === 11;
  };

  const limparCampos = () => {
    setNome('');
    setCpf('');
    setSenha('');
    setConfirmSenha('');
  };

  const handleCadastro = async () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Informe o nome completo');
      return;
    }
    if (!validarCpf(cpf)) {
      Alert.alert('Erro', 'CPF inválido. Informe 11 dígitos.');
      return;
    }
    if (!passwordIsStrong(senha)) {
      Alert.alert('Erro', 'Senha fraca. Mínimo 6 caracteres, com 1 maiúscula, 1 minúscula e 1 número.');
      return;
    }
    if (senha !== confirmSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    try {
      const digits = onlyDigits(cpf);
      const last4 = digits.slice(-4);
  const cpfHash = hash256(digits);

      // grava no Firestore (store last4 + hash em vez do CPF completo)
      const docRef = await addDoc(collection(db, 'users'), {
        nome: nome.trim(),
        cpfLast4: last4,
        cpfHash,
        createdAt: new Date().toISOString(),
      });

      // grava localmente (userData) com id do documento
      const userData = { id: docRef.id, nome: nome.trim(), cpfLast4: last4 };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      Alert.alert('Sucesso', 'Cadastro realizado!');
      limparCampos();
      navigation.replace('Home');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      Alert.alert('Erro', 'Não foi possível completar o cadastro. Tente novamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Criar Conta</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={formatCpfInput}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        value={confirmSenha}
        onChangeText={setConfirmSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={18} color="white" />
        <Text style={styles.backText}>VOLTAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.gearButton} onPress={() => navigation.navigate('AdminLogin')}>
        <Ionicons name="settings-outline" size={22} color="black" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 24 },
  logo: { width: 100, height: 100 },
  title: { fontSize: 22, fontWeight: '700', color: '#0066cc', marginTop: 8 },
  input: {
    width: '100%',
    backgroundColor: '#f1f7ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  botao: { width: '100%', backgroundColor: '#0077cc', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: '600' },
  backButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0066cc', padding: 10, borderRadius: 8, marginTop: 10 },
  backText: { color: 'white', fontWeight: '700', marginLeft: 8 },
  gearButton: { padding: 10, backgroundColor: '#eee', borderRadius: 30, marginTop: 18 },
});