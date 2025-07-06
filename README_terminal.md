# Guia de Instalação e Execução - Alunos e Cursos

Este guia fornece instruções passo a passo para configurar e executar o projeto de gerenciamento de Alunos e Cursos.

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)
- PostgreSQL (versão 12 ou superior)

## 🔧 Configuração Inicial

1. **Clonar o repositório**
   ```bash
   git clone [URL_DO_REPOSITÓRIO]
   cd Alunos_e_Cursos
   ```

2. **Instalar dependências**
   ```bash
   npm install
   ```

3. **Configurar banco de dados**
   - Crie um banco de dados PostgreSQL chamado `aluno_curso`
   - Atualize as credenciais no arquivo `app.js` se necessário:
     ```javascript
     const pool = new Pool({
       user: "postgres",
       host: "localhost",
       database: "aluno_curso",
       password: "sua_senha",
       port: 5432
     });
     ```

## 🚀 Executando o Projeto

1. **Iniciar o servidor**
   ```bash
   node app.js
   ```
   O servidor será iniciado em `http://localhost:3001`.

2. **Testar a API**
   Você pode testar os endpoints usando ferramentas como:
   - Postman
   - Insomnia
   - cURL
   - Navegador (para requisições GET)

## 📚 Endpoints da API

### Cursos
- `GET /cursos` - Lista todos os cursos
- `GET /cursos/:id` - Busca um curso específico
- `POST /cursos` - Cria um novo curso
- `PUT /cursos/:id` - Atualiza um curso
- `DELETE /cursos/:id` - Remove um curso

### Alunos
- `GET /alunos` - Lista todos os alunos
- `GET /alunos/:id` - Busca um aluno específico
- `POST /alunos` - Cria um novo aluno
- `PUT /alunos/:id` - Atualiza um aluno
- `DELETE /alunos/:id` - Remove um aluno

## 🛠️ Comandos Úteis

- Instalar dependências: `npm install`

- Iniciar servidor: `node app.js`

- Ver versão do Node: `node -v`

- Ver versão do npm: `npm -v`

- Inicializar projeto: `npm init -y`

- Instalar express: `npm install express`

- Instalar pg: `npm install pg`

- Instalar jest: `npm install --save-dev jest`

- Instalar supertest: `npm install --save-dev supertest`

## ⚠️ Solução de Problemas

- **Erro de conexão com o banco de dados**
  - Verifique se o PostgreSQL está rodando
  - Confirme as credenciais no arquivo `app.js`
  - Verifique se o banco de dados `aluno_curso` foi criado

- **Erro de porta em uso**
  ```bash
  lsof -i :3001 # Verifica o processo usando a porta 3000
  kill -9 <PID>   # Substitua <PID> pelo número do processo
  ```

## 📝 Notas

- Certifique-se de ter as permissões adequadas no banco de dados
- Mantenha suas credenciais em segurança, não as compartilhe publicamente
- Para ambientes de produção, utilize variáveis de ambiente para armazenar credenciais sensíveis
