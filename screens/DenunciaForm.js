// screens/DenunciaForm.js
import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { alocarDenunciasCombinatorio } from '../utils/solverCombinatorio';

export default function DenunciaForm() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultado, setResultado] = useState(null);

  const gerarEscala = () => {
    setLoading(true);
    setProgress(0);
    setResultado(null);

    // === DADOS DE TESTE (substitua pelos reais depois) ===
    const denuncias = Array(45).fill(null).map((_, i) => ({
      id: i,
      tipo: i % 2 === 0 ? 'infra' : 'saude'
    }));
    const servidores = Array(12).fill(null).map((_, i) => ({
      id: i,
      especialidade: ['infra', 'saude'],
      folgas: new Set([i % 7])
    }));
    const dias = Array(7).fill(null).map((_, i) => ({
      id: i,
      nome: `Dia ${i + 1}`
    }));

    const worker = new Worker(new URL('../public/solverWorker.js', import.meta.url));

    worker.onmessage = (e) => {
      if (e.data.type === 'progress') setProgress(e.data.value);
      else if (e.data.type === 'result') {
        setResultado(e.data.solucao);
        setLoading(false);
        worker.terminate();
      }
    };

    worker.postMessage({ denuncias, servidores, dias });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerar Escala de Denúncias</Text>
      <Button
        title={loading ? `Gerando... ${Math.round(progress * 100)}%` : "GERAR ESCALA"}
        onPress={gerarEscala}
        disabled={loading}
      />
      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
      {resultado && (
        <Text style={styles.success}>
          Escala gerada! {Object.keys(resultado).length} alocações.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  success: { marginTop: 20, color: 'green', fontWeight: 'bold', textAlign: 'center' },
});