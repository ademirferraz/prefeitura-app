create_admin.js — instruções

Este script cria um usuário administrador no Firebase Authentication e registra um documento na coleção `admins` do Firestore.

Pré-requisitos
- Node.js instalado
- Ter um arquivo JSON de service account do Firebase (Console Firebase → Configurações do projeto → Contas de serviço → Gerar nova chave privada)

Como usar

1) Coloque o arquivo JSON da service account em `scripts/serviceAccountKey.json` OU defina a variável de ambiente:

   Windows PowerShell:
     $env:GOOGLE_APPLICATION_CREDENTIALS = 'C:\caminho\para\serviceAccountKey.json'

   PowerShell (temporário para o comando):
     SET GOOGLE_APPLICATION_CREDENTIALS=C:\caminho\para\serviceAccountKey.json

2) Instale a dependência:

   cd d:\projetos\prefeituraAppLimpo
   npm install firebase-admin

3) Execute o script:

   node scripts/create_admin.js --email admin@example.com --password S3nh@Segura

Ou sem argumentos, ele perguntará pelo e-mail e senha interativamente.

Segurança
- Nunca comite o arquivo de service account em repositórios públicos.
- Prefira executar este script apenas em ambientes de administração local/servidor seguro.
