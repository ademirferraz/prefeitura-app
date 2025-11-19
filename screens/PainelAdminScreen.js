// screens/AdminPanel.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AdminPanel() {
  const navigation = useNavigation();

  // Formulário
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [senha, setSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');

  const validarSenha = (s) => {
    if (s.length < 6) return false;
    if (!/[A-Z]/.test(s)) return false;
    if (!/[a-z]/.test(s)) return false;
    if (!/[0-9]/.test(s)) return false;
    return true;
  };

  const cadastrar = () => {
    if (!nome || !cpf || !dataNasc || !senha || !repetirSenha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    if (senha !== repetirSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
    if (!validarSenha(senha)) {
      Alert.alert('Senha inválida', 'A senha deve ter no mínimo 6 caracteres: 1 maiúscula, 1 minúscula e 1 número');
      return;
    }
    Alert.alert('Sucesso', `Cidadão ${nome} cadastrado com sucesso!`);
    // Limpar campos
    setNome(''); setCpf(''); setDataNasc(''); setSenha(''); setRepetirSenha('');
  };

  return (
    <ScrollView style={styles.container}>
      {/* LOGO + TÍTULO */}
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>PAINEL DO ADMINISTRADOR</Text>
      </View>

      <Text style={styles.welcome}>Bem-vindo, Ademir!</Text>

      {/* FORMULÁRIO CADASTRO CIDADÃO */}
      <View style={styles.form}>
        <Text style={styles.label}>Nome completo</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="João Silva" />

        <Text style={styles.label}>CPF</Text>
        <TextInput style={styles.input} value={cpf} onChangeText={setCpf} placeholder="000.000.000-00" keyboardType="numeric" />

        <Text style={styles.label}>Data de Nascimento</Text>
        <TextInput style={styles.input} value={dataNasc} onChangeText={setDataNasc} placeholder="01/01/1990" />

        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} value={senha} onChangeText={setSenha} placeholder="Mínimo 6 caracteres" secureTextEntry />

        <Text style={styles.label}>Repetir Senha</Text>
        <TextInput style={styles.input} value={repetirSenha} onChangeText={setRepetirSenha} placeholder="Digite novamente" secureTextEntry />

        <Button title="CADASTRAR CIDADÃO" onPress={cadastrar} color="#0066cc" />
      </View>

      {/* BOTÃO VOLTAR */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.backText}>VOLTAR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { alignItems: 'center', marginVertical: 20 },
  logo: { width: 80, height: 80, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0066cc' },
  welcome: { textAlign: 'center', fontSize: 16, color: '#555', marginBottom: 20 },
  form: { paddingHorizontal: 20 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 15, marginBottom: 5, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, backgroundColor: '#fff' },
  backButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0066cc', margin: 20, padding: 15, borderRadius: 10 },
  backText: { color: 'white', fontWeight: 'bold', marginLeft: 8, fontSize: 16 },
});