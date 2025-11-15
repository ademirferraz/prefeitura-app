// screens/CapturaMidiaScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CapturaMidiaScreen({ navigation }) {
  const [imagem, setImagem] = useState(null);

  const tirarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Erro", "Permissão para usar a câmera é necessária!");
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
      Alert.alert("Sucesso!", "Foto enviada para análise da prefeitura.");
    }
  };

  const escolherFoto = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
      Alert.alert("Sucesso!", "Foto selecionada e enviada!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Captura de Mídia</Text>
      <Text style={styles.subtitle}>Envie fotos de problemas na cidade</Text>

      <TouchableOpacity style={styles.btn} onPress={tirarFoto}>
        <Text style={styles.btnText}>Tirar Foto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={escolherFoto}>
        <Text style={styles.btnText}>Escolher da Galeria</Text>
      </TouchableOpacity>

      {imagem && <Image source={{ uri: imagem }} style={styles.preview} />}

      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Text style={styles.voltarText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#2c3e50', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#7f8c8d', marginBottom: 30, textAlign: 'center' },
  btn: { backgroundColor: '#3498db', width: '80%', padding: 18, borderRadius: 12, alignItems: 'center', marginVertical: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  preview: { width: 300, height: 300, borderRadius: 12, marginVertical: 20 },
  voltar: { marginTop: 40 },
  voltarText: { fontSize: 18, color: '#e74c3c', fontWeight: 'bold' },
});