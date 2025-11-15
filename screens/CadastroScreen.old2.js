// screens/CadastroScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const CadastroScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // LIMPA TUDO AO ENTRAR NA TELA
  useFocusEffect(
    useCallback(() => {
      setNome('');
      setCpf('');
      setDataNasc('');
      setEmail('');
      setSenha('');
      setConfirmarSenha('');
    }, [])
  );

  // MÁSCARA DE CPF (123.456.789-00)
  const formatarCPF = (texto) => {
    const numeros = texto.replace(/\D/g, '').slice(0, 11);
    if (numeros.length <= 3) return numeros;
    if (numeros.length <= 6) return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
    if (numeros.length <= 9) return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`;
    return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9, 11)}`;
  };

  // MÁSCARA DE DATA (23/05/1951)
  const formatarData = (texto) => {
    const numeros = texto.replace(/\D/g, '').slice(0, 8);
    if (numeros.length <= 2) return numeros;
    if (numeros.length <= 4) return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
    return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4, 8)}`;
  };

  // VALIDAÇÃO DE SENHA FORTE
  const validarSenha = (s) => {
    const temMaiuscula = /[A-Z]/.test(s);
    const temMinuscula = /[a-z]/.test(s);
    const temNumero = /[0-9]/.test(s);
    const temMinimo = s.length >= 6;
    return temMaiuscula && temMinuscula && temNumero && temMinimo;
  };

  const cadastrar = () => {
    if (!nome || !cpf || !dataNasc || !email || !senha || !confirmarSenha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      Alert.alert("Erro", "CPF deve ter 11 números");
      return;
    }
    if (dataNasc.replace(/\D/g, '').length !== 8) {
      Alert.alert("Erro", "Data deve ter 8 números (DDMMAAAA)");
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }
    if (!validarSenha(senha)) {
      Alert.alert("Erro", "Senha deve ter:\n• 6+ caracteres\n• 1 maiúscula\n• 1 minúscula\n• 1 número");
      return;
    }
    Alert.alert("Sucesso", "Cadastro realizado!");
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
        autoComplete="off"
        importantForAutofill="no"
      />

      <TextInput
        style={styles.input}
        placeholder="CPF (somente números)"
        value={formatarCPF(cpf)}
        onChangeText={(texto) => setCpf(texto.replace(/\D/g, '').slice(0, 11))}
        keyboardType="numeric"
        autoComplete="off"
        autoCorrect={false}
        autoCapitalize="none"
        textContentType="none"
        importantForAutofill="no"
        inputMode="numeric"
        maxLength={14}
        // NÃO É CARTÃO!
        autoCompleteType="off"
        name="cpf"
      />

      <TextInput
        style={styles.input}
        placeholder="Data de nascimento (DD/MM/AAAA)"
        value={formatarData(dataNasc)}
        onChangeText={(texto) => setDataNasc(texto.replace(/\D/g, '').slice(0, 8))}
        keyboardType="numeric"
        autoComplete="off"
        autoCorrect={false}
        autoCapitalize="none"
        textContentType="none"
        importantForAutofill="no"
        inputMode="numeric"
        maxLength={10}
        // NÃO É DATA DE VALIDADE!
        name="birthdate"
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoComplete="off"
        importantForAutofill="no"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha (mín. 6 caracteres)"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        autoComplete="new-password"
        importantForAutofill="no"
      />

      <TextInput
        style={styles.input}
        placeholder="Repetir senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
        autoComplete="new-password"
        importantForAutofill="no"
      />

      <TouchableOpacity style={styles.btn} onPress={cadastrar}>
        <Text style={styles.btnText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#2c3e50' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  btn: { backgroundColor: '#2ecc71', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});

export default CadastroScreen;