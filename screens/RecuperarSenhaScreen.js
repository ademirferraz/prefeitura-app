import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const RecuperarSenhaScreen = ({ navigation }) => {
  const [ultimos4CPF, setUltimos4CPF] = useState('');

   const recuperarSenha = () => {
    if (recuperarCpf.length !== 4) {
      Alert.alert("Erro", "Digite os 4 últimos dígitos do CPF");
      return;
    }
    Alert.alert("Recuperação", `Senha enviada para o e-mail com final **${recuperarCpf}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>
      <Text style={styles.info}>Digite os últimos 4 dígitos do seu CPF</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 1234"
        value={ultimos4CPF}
        onChangeText={setUltimos4CPF}
        keyboardType="numeric"
        maxLength={4}
      />

      <TouchableOpacity style={styles.btn} onPress={recuperar}>
        <Text style={styles.btnText}>Enviar Nova Senha</Text>
      </TouchableOpacity>
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