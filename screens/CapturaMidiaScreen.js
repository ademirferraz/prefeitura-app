import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { db, storageApp } from './firebaseConfig';

export default function CapturaMidiaScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão', 'É necessária permissão de câmera/galeria para enviar mídia.');
        }
      } catch (e) {
        console.warn('Permissão de mídia falhou', e);
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All, quality: 0.7 });
      if (!result.cancelled && result.uri) setImageUri(result.uri);
    } catch (error) {
      console.error('Erro picker:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
      if (!result.cancelled && result.uri) setImageUri(result.uri);
    } catch (error) {
      console.error('Erro câmera:', error);
      Alert.alert('Erro', 'Não foi possível abrir a câmera.');
    }
  };

  const uploadMedia = async () => {
    if (!imageUri) {
      Alert.alert('Erro', 'Selecione ou tire uma foto antes de enviar.');
      return;
    }
    setUploading(true);
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const storage = getStorage(storageApp);
      const filename = `uploads/${Date.now()}`;
      const storageRef = ref(storage, filename);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);

      const userJson = await AsyncStorage.getItem('userData');
      const user = userJson ? JSON.parse(userJson) : null;

      await addDoc(collection(db, 'midias'), {
        url,
        autorId: user?.id || null,
        autorNome: user?.nome || null,
        status: 'pendente_moderação',
        createdAt: new Date().toISOString(),
      });

      Alert.alert('Sucesso', 'Mídia enviada com sucesso e aguardando moderação.');
      setImageUri(null);
      navigation.goBack();
    } catch (error) {
      console.error('Erro upload:', error);
      Alert.alert('Erro', 'Falha ao enviar mídia.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enviar Mídia</Text>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.btn} onPress={pickImage}><Text style={styles.btnText}>Selecionar</Text></TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={takePhoto}><Text style={styles.btnText}>Tirar Foto</Text></TouchableOpacity>
      </View>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}

      {uploading ? (
        <ActivityIndicator size="large" color="#0077cc" style={{ marginTop: 12 }} />
      ) : (
        <TouchableOpacity style={[styles.btn, { marginTop: 12 }]} onPress={uploadMedia}><Text style={styles.btnText}>Enviar</Text></TouchableOpacity>
      )}

      <TouchableOpacity style={{ marginTop: 12 }} onPress={() => navigation.goBack()}>
        <Text style={{ color: '#1565c0' }}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  buttonsRow: { flexDirection: 'row' },
  btn: { backgroundColor: '#0077cc', padding: 12, borderRadius: 8, alignItems: 'center', marginRight: 8 },
  btnText: { color: '#fff', fontWeight: '700' },
  preview: { width: '100%', height: 300, marginTop: 12, borderRadius: 8 },
});