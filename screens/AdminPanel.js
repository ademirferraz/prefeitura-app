import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from './firebaseConfig';

export default function AdminPanel({ navigation }) {
  const [elogios, setElogios] = useState([]);
  const [midias, setMidias] = useState([]);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    (async () => {
      const a = await AsyncStorage.getItem('adminData');
      setAdminUser(a ? JSON.parse(a) : null);
    })();
    fetchPendentes();
  }, []);

  const fetchPendentes = async () => {
    try {
      const q1 = query(collection(db, 'elogios'), where('status', '==', 'pendente_moderação'));
      const snap1 = await getDocs(q1);
      setElogios(snap1.docs.map(d => ({ id: d.id, ...d.data() })));

      const q2 = query(collection(db, 'midias'), where('status', '==', 'pendente_moderação'));
      const snap2 = await getDocs(q2);
      setMidias(snap2.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error('Erro ao buscar pendentes:', error);
      Alert.alert('Erro', 'Não foi possível carregar itens pendentes.');
    }
  };

  const aplicarAcao = async (collectionName, itemId, action, motivo = null) => {
    try {
      const ref = doc(db, collectionName, itemId);
      const user = auth && auth.currentUser ? auth.currentUser : null;
      const moderatedByEmail = user?.email || adminUser?.email || null;
      const moderatedByUid = user?.uid || adminUser?.uid || null;
      await updateDoc(ref, {
        status: action === 'approve' ? 'aprovado' : 'rejeitado',
        moderatedAt: new Date().toISOString(),
        moderatedBy: moderatedByEmail,
        moderatedByEmail,
        moderatedByUid,
        moderationReason: motivo || null,
      });
      Alert.alert('OK', `Item ${action === 'approve' ? 'aprovado' : 'rejeitado'}`);
      fetchPendentes();
    } catch (error) {
      console.error('Erro ao moderar:', error);
      Alert.alert('Erro', 'Falha ao aplicar ação.');
    }
  };

  const renderElogio = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Elogio</Text>
      <Text>{item.texto}</Text>
      <Text style={styles.meta}>Autor: {item.autorNome || 'Anônimo'}</Text>
      {item.moderatedByEmail ? <Text style={styles.meta}>Moderado por: {item.moderatedByEmail}</Text> : null}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.approve} onPress={() => aplicarAcao('elogios', item.id, 'approve')}><Text style={styles.actionText}>Aprovar</Text></TouchableOpacity>
        <TouchableOpacity style={styles.reject} onPress={() => aplicarAcao('elogios', item.id, 'reject')}><Text style={styles.actionText}>Rejeitar</Text></TouchableOpacity>
      </View>
    </View>
  );

  const renderMidia = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Mídia</Text>
      <Text numberOfLines={2}>{item.url}</Text>
      <Text style={styles.meta}>Autor: {item.autorNome || 'Anônimo'}</Text>
      {item.moderatedByEmail ? <Text style={styles.meta}>Moderado por: {item.moderatedByEmail}</Text> : null}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.approve} onPress={() => aplicarAcao('midias', item.id, 'approve')}><Text style={styles.actionText}>Aprovar</Text></TouchableOpacity>
        <TouchableOpacity style={styles.reject} onPress={() => aplicarAcao('midias', item.id, 'reject')}><Text style={styles.actionText}>Rejeitar</Text></TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel do Admin</Text>
      <Text style={styles.section}>Elogios pendentes</Text>
      <FlatList data={elogios} keyExtractor={i => i.id} renderItem={renderElogio} ListEmptyComponent={<Text>Nenhum elogio pendente</Text>} />

      <Text style={[styles.section, { marginTop: 12 }]}>Mídias pendentes</Text>
      <FlatList data={midias} keyExtractor={i => i.id} renderItem={renderMidia} ListEmptyComponent={<Text>Nenhuma mídia pendente</Text>} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  section: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  card: { backgroundColor: '#f7fbff', padding: 12, borderRadius: 8, marginBottom: 10 },
  cardTitle: { fontWeight: '700', marginBottom: 6 },
  meta: { marginTop: 6, color: '#666' },
  actionsRow: { flexDirection: 'row', marginTop: 8 },
  approve: { backgroundColor: '#2ecc71', padding: 8, borderRadius: 6, marginRight: 8 },
  reject: { backgroundColor: '#e74c3c', padding: 8, borderRadius: 6 },
  actionText: { color: '#fff', fontWeight: '700' },
});
