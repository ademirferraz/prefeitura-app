// screens/DenunciaForm.js
import { resolverAlocacao } from '../utils/solverCombinatorio';

const handleEnviar = async () => {
  const { clauses, variaveis } = resolverAlocacao(
    [novaDenuncia, ...pendentes],
    servidores,
    proximos30Dias,
    regras
  );

  const solucao = await solveSAT(clauses, variaveis); // via Web Worker

  if (solucao) {
    // Extrair alocação
    Alert.alert("Alocada com sucesso!");
  } else {
    Alert.alert("Sem solução viável");
  }
};