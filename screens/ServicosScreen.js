// screens/ServicosScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ServicosScreen({ navigation }) {
  const abrirLink = (url) => {
    Linking.openURL(url).catch(() => Alert.alert("Erro", "Não foi possível abrir o link"));
  };

  const itens = [
    {
      titulo: "Emissão e Consulta de Documentos",
      icon: "document-text",
      itens: [
        "Alvarás e licenças",
        "Consulta à legislação municipal",
        "Guias de pagamento (IPTU, taxas, multas)",
      ],
    },
    {
      titulo: "Atendimento ao Cidadão",
      icon: "headset",
      itens: [
        "Agendamento de consultas (saúde)",
        "Dúvidas sobre tributos",
        "Procon Municipal",
      ],
    },
    {
      titulo: "Licitações e Compras",
      icon: "briefcase",
      itens: [
        "Editais de licitação",
        "Credenciamento de fornecedores",
        "Transparência em compras",
      ],
    },
    {
      titulo: "Emissão de Documentos",
      icon: "checkbox",
      itens: [
        "Certidão Negativa de Débitos (CND)",
        "Alvará de funcionamento",
        "Licenças sanitárias/ambientais",
      ],
    },
    {
      titulo: "Impostos e Finanças",
      icon: "cash",
      itens: [
        { texto: "Nota Fiscal Eletrônica (NFE)", acao: () => abrirLink('https://www.tributosmunicipais.com.br/NFE-bomconselho/') },
        "Consulta e pagamento de impostos",
        "Portal da Transparência",
      ],
    },
    {
      titulo: "Protocolo e Acompanhamento",
      icon: "send",
      itens: [
        "Abertura de protocolo digital",
        "Tapa-buraco, iluminação, poda",
        "Central 156WEB (chat/app)",
      ],
    },
    {
      titulo: "Educação e Saúde",
      icon: "heart",
      itens: [
        "Matrícula em creches/escolas",
        "Agendamento de exames",
      ],
    },
    {
      titulo: "Outros Serviços",
      icon: "ellipsis-horizontal",
      itens: [
        "Diário Oficial",
        "Concursos públicos",
        "Ouvidoria (reclamações)",
      ],
    },
    {
      titulo: "Para Servidores",
      icon: "person",
      itens: [
        "Holerite e contracheque",
        "Férias e licenças",
        "Dados funcionais",
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Serviços Online</Text>

      {itens.map((secao, i) => (
        <View key={i} style={styles.secao}>
          <View style={styles.secaoHeader}>
            <Ionicons name={secao.icon} size={24} color="#2ecc71" />
            <Text style={styles.secaoTitulo}>{secao.titulo}</Text>
          </View>
          {secao.itens.map((item, j) => {
            if (typeof item === 'object' && item.acao) {
              return (
                <TouchableOpacity key={j} style={styles.itemLink} onPress={item.acao}>
                  <Text style={styles.itemText}>{item.texto}</Text>
                  <Ionicons name="open-outline" size={16} color="#3498db" />
                </TouchableOpacity>
              );
            }
            return (
              <View key={j} style={styles.item}>
                <Text style={styles.itemText}>• {item}</Text>
              </View>
            );
          })}
        </View>
      ))}

      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Text style={styles.voltarText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 15 },
  header: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginVertical: 15, color: '#2c3e50' },
  secao: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15, elevation: 2 },
  secaoHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  secaoTitulo: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50', marginLeft: 10 },
  item: { paddingVertical: 6 },
  itemLink: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  itemText: { fontSize: 15, color: '#34495e' },
  voltar: { marginVertical: 30, alignItems: 'center' },
  voltarText: { fontSize: 18, color: '#e74c3c', fontWeight: 'bold' },
});