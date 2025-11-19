// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [hiddenCode, setHiddenCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [masterPassword, setMasterPassword] = useState('');

  const ACTIVATION_CODE = 'ADM'; // Gatilho
  const MASTER_PASSWORD = 'P41n3l$up3rS3cr3t0!'; // Senha real (mude depois!)

  const handleHiddenInput = (text) => {
    setHiddenCode(text);
    if (text === ACTIVATION_CODE) {
      setHiddenCode(''); // Limpa
      setModalVisible(true); // Abre modal
    }
  };

  const handleLogin = () => {
    if (masterPassword === MASTER_PASSWORD) {
      setModalVisible(false);
      setMasterPassword('');
      navigation.navigate('AdminPanel');
      Alert.alert('Acesso Liberado', 'Bem-vindo ao Painel Admin!');
    } else {
      Alert.alert('Erro', 'Senha mestra incorreta');
      setMasterPassword('');
    }
  };

  return (
    <View style={styles.container}>
      {/* LOGO DA PREFEITURA */}
  <Image 
  source={{ uri: 'logo.png' }} 
  style={styles.logo} 
  resizeMode="contain" 
/>

      <Text style={styles.title}>Bem-vindo ao App da Prefeitura</Text>
      <Text style={styles.subtitle}>Denúncias, Elogios, Escalas e Mais</Text>

      {/* CAMPO OCULTO (SEGREDO) */}
      <TextInput
        style={styles.hiddenInput}
        value={hiddenCode}
        onChangeText={handleHiddenInput}
        autoCapitalize="characters"
        placeholderTextColor="transparent"
        keyboardType="default"
      />

      {/* BOTÕES NORMAIS DO APP */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DenunciaForm')}>
        <Text style={styles.buttonText}>Fazer Denúncia</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Elogios')}>
        <Text style={styles.buttonText}>Enviar Elogio</Text>
      </TouchableOpacity>

      {/* MODAL DE LOGIN ADMIN */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Acesso Administrativo</Text>
            <Text style={styles.modalSubtitle}>Digite a senha mestra</Text>

            <TextInput
              style={styles.modalInput}
              value={masterPassword}
              onChangeText={setMasterPassword}
              placeholder="Senha mestra"
              secureTextEntry
              autoCapitalize="none"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => {
                setModalVisible(false);
                setMasterPassword('');
              }}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginText}>Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa', alignItems: 'center' },
  logo: { width: 120, height: 120, marginTop: 40, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#0066cc', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 40 },

  // CAMPO SECRETO
  hiddenInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 80,
    opacity: 0,
    zIndex: 999,
  },

  button: { backgroundColor: '#0066cc', padding: 15, borderRadius: 10, width: '80%', marginVertical: 10 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },

  // MODAL
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: 'white', padding: 25, borderRadius: 15, width: '85%', alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#0066cc', marginBottom: 10 },
  modalSubtitle: { fontSize: 14, color: '#555', marginBottom: 20 },
  modalInput: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, width: '100%', marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  cancelButton: { backgroundColor: '#ccc', padding: 12, borderRadius: 8, flex: 1, marginRight: 10 },
  cancelText: { textAlign: 'center', fontWeight: 'bold' },
  loginButton: { backgroundColor: '#0066cc', padding: 12, borderRadius: 8, flex: 1 },
  loginText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});