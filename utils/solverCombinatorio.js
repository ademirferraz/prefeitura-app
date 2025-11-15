
// utils/solverCombinatorio.js
// SOLVER BASEADO EM GRAFO + SAT (MATEMÁTICA PURA)

export function resolverAlocacao(denuncias, servidores, dias, regras) {
  const n = denuncias.length;
  const m = servidores.length;
  const d = dias.length;

  // 1. Criar grafo de conflitos (C(n+m+d, 2) no pior caso, mas esparso)
  const conflitos = new Map();

  function adicionarConflito(a, b) {
    const keyA = `${a.tipo}-${a.id}`;
    const keyB = `${b.tipo}-${b.id}`;
    if (!conflitos.has(keyA)) conflitos.set(keyA, new Set());
    if (!conflitos.has(keyB)) conflitos.set(keyB, new Set());
    conflitos.get(keyA).add(keyB);
    conflitos.get(keyB).add(keyA);
  }

  // 2. Popular conflitos (C(n*m,2) → mas só arestas reais)
  denuncias.forEach((den, i) => {
    servidores.forEach((serv, j) => {
      // Incompatibilidade: especialidade, folga, carga
      if (!serv.especialidade.includes(den.tipo)) {
        adicionarConflito({ tipo: 'den', id: i }, { tipo: 'serv', id: j });
      }
      dias.forEach((dia, k) => {
        if (serv.folgas.has(dia.id)) {
          adicionarConflito({ tipo: 'serv', id: j }, { tipo: 'dia', id: k });
        }
      });
    });
  });

  // 3. Gerar variáveis SAT: X_{i,j,k} = denúncia i alocada a servidor j no dia k
  const variaveis = [];
  const clauses = [];

  let varCount = 0;
  const varMap = new Map(); // (i,j,k) → índice

  denuncias.forEach((_, i) => {
    servidores.forEach((_, j) => {
      dias.forEach((_, k) => {
        const key = `${i},${j},${k}`;
        varMap.set(key, varCount++);
        variaveis.push(key);
      });
    });
  });

  // 4. Restrições SAT (fórmulas em CNF)

  // (a) Cada denúncia deve ser alocada exatamente uma vez
  denuncias.forEach((_, i) => {
    const linha = [];
    servidores.forEach((_, j) => {
      dias.forEach((_, k) => {
        const v = varMap.get(`${i},${j},${k}`);
        linha.push(v);
      });
    });
    // Exatamente 1: usar "exactly one" encoding
    for (let p = 0; p < linha.length; p++) {
      for (let q = p + 1; q < linha.length; q++) {
        clauses.push([-linha[p], -linha[q]]); // ¬X_p ∧ ¬X_q
      }
    }
    // Pelo menos uma
    clauses.push(linha);
  });

  // (b) Conflitos: se A conflita com B, não podem ser verdadeiros juntos
  for (const [keyA, setB] of conflitos) {
    const [tipoA, idA] = keyA.split('-').map((x, i) => i === 1 ? parseInt(x) : x);
    for (const keyB of setB) {
      const [tipoB, idB] = keyB.split('-').map((x, i) => i === 1 ? parseInt(x) : x);
      if (tipoA === 'den' && tipoB === 'serv') {
        dias.forEach((_, k) => {
          const v1 = varMap.get(`${idA},${idB},${k}`);
          if (v1 !== undefined) clauses.push([-v1]);
        });
      }
      // Adicione outros casos
    }
  });

  // 5. Resolver com MiniSAT (ou Z3 via WASM)
  // → Use biblioteca: npm install sat-solver
  // Ou gere .cnf e rode com https://github.com/arminbiere/cadical (via WebAssembly)

  return { variaveis, clauses, resolver: () => runSAT(clauses, varCount) };
}