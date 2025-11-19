#!/usr/bin/env node
/*
  create_admin.js
  Script Node.js para criar um administrador usando Firebase Admin SDK

  Uso:
    # Defina a variável de ambiente apontando para o arquivo JSON da service account
    SET GOOGLE_APPLICATION_CREDENTIALS=absolute\path\to\serviceAccountKey.json
    node scripts/create_admin.js --email admin@example.com --password S3nh@Segura

  Se você não fornecer --email ou --password, o script pedirá os dados via prompt.

  Segurança: não versionar o arquivo da service account. Use variáveis de ambiente em CI/CD.
*/

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--email' && args[i + 1]) { out.email = args[i + 1]; i++; }
    else if (a === '--password' && args[i + 1]) { out.password = args[i + 1]; i++; }
  }
  return out;
}

async function prompt(question) {
  return new Promise((resolve) => {
    const rl = require('readline').createInterface({ input: process.stdin, output: process.stdout });
    rl.question(question, (ans) => { rl.close(); resolve(ans); });
  });
}

async function main() {
  try {
    const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(__dirname, 'serviceAccountKey.json');
    if (!fs.existsSync(serviceAccountPath)) {
      console.error('Arquivo da service account não encontrado. Defina GOOGLE_APPLICATION_CREDENTIALS ou coloque serviceAccountKey.json em scripts/.');
      process.exit(1);
    }

    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    const db = admin.firestore();

    const args = parseArgs();
    const email = args.email || (await prompt('E-mail do admin: '));
    const password = args.password || (await prompt('Senha (visível): '));

    if (!email || !password) {
      console.error('E-mail e senha são obrigatórios.');
      process.exit(1);
    }

    console.log('Criando usuário no Firebase Auth...');
    const userRecord = await admin.auth().createUser({ email, password });
    console.log('Usuário criado com uid:', userRecord.uid);

    console.log('Registrando na coleção admins...');
    const docRef = await db.collection('admins').add({ uid: userRecord.uid, email, role: 'admin', createdAt: new Date().toISOString() });
    console.log('Documento admin criado com id:', docRef.id);

    console.log('Pronto. Admin criado com sucesso.');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao criar admin:', err && err.message ? err.message : err);
    process.exit(1);
  }
}

main();
