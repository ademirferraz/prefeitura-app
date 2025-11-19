// public/solverWorker.js
import { alocarDenunciasCombinatorio } from '../utils/solverCombinatorio';

self.onmessage = function(e) {
  const { denuncias, servidores, dias } = e.data;
  let progress = 0;

  const onProgress = (p) => {
    progress = p;
    self.postMessage({ type: 'progress', value: p });
  };

  const solucao = alocarDenunciasCombinatorio(denuncias, servidores, dias, onProgress);
  self.postMessage({ type: 'result', solucao });
};