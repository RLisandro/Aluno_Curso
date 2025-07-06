# 📊 Documentação do Banco de Dados - Alunos e Cursos

Este documento fornece informações detalhadas sobre a estrutura e configuração do banco de dados do sistema de gerenciamento de alunos e cursos.

## 🗃️ Estrutura do Banco de Dados

### Tabela: `cursos`

Armazena informações sobre os cursos disponíveis.

| Coluna     | Tipo         | Descrição                    |
| ---------- | ------------ | ---------------------------- |
| id         | SERIAL       | Chave primária               |
| nome_curso | VARCHAR(255) | Nome do curso (obrigatório)  |
| descricao  | TEXT         | Descrição detalhada do curso |

### Tabela: `alunos`

Armazena informações sobre os alunos.

| Coluna          | Tipo         | Descrição                            |
| --------------- | ------------ | ------------------------------------ |
| id              | SERIAL       | Chave primária                       |
| nome            | VARCHAR(255) | Nome completo do aluno (obrigatório) |
| email           | VARCHAR(255) | E-mail do aluno (único, obrigatório) |
| data_nascimento | DATE         | Data de nascimento do aluno          |

### Tabela: `matriculas`

Tabela de junção que relaciona alunos a cursos (relacionamento muitos-para-muitos).

| Coluna         | Tipo      | Descrição                                     |
| -------------- | --------- | --------------------------------------------- |
| aluno_id       | INTEGER   | Chave estrangeira para a tabela alunos        |
| curso_id       | INTEGER   | Chave estrangeira para a tabela cursos        |
| data_matricula | TIMESTAMP | Data e hora da matrícula (padrão: data atual) |

## 🛠️ Configuração do Banco de Dados

### Opção 1: Configuração via pgAdmin (Interface Gráfica)

#### Passo a Passo Detalhado:

**1. Abrir o pgAdmin**

- Inicie o pgAdmin 4 no seu computador
- Faça login com suas credenciais do PostgreSQL

**2. Conectar ao Servidor PostgreSQL**

- No painel esquerdo, clique com o botão direito em "Servers"
- Selecione "Register" → "Server..."
- Na aba "General":
  - Name: `Local PostgreSQL` (ou qualquer nome que preferir)
- Na aba "Connection":
  - Host name/address: `localhost`
  - Port: `5432`
  - Maintenance database: `postgres`
  - Username: `postgres` (ou seu usuário)
  - Password: `sua_senha`
- Clique em "Save"

**3. Criar o Banco de Dados**

- Expanda o servidor recém-criado
- Clique com o botão direito em "Databases"
- Selecione "Create" → "Database..."
- Nome do banco: `alunos_cursos`
- Clique em "Save"

**4. Executar o Script SQL**

- Clique com o botão direito no banco `alunos_cursos`
- Selecione "Query Tool"
- No editor que abrir, clique em "Open File" (ícone de pasta)
- Navegue até o arquivo `database.sql` do projeto
- Clique em "Open"
- Clique no botão "Execute" (▶️) ou pressione F5
- **Alternativa:** Copie e cole todo o conteúdo do arquivo `database.sql` diretamente no editor

**5. Verificar a Criação das Tabelas**

- Expanda o banco `alunos_cursos`
- Expanda "Schemas" → "public" → "Tables"
- Você deve ver as tabelas: `alunos`, `cursos`, `matriculas`

**6. Verificar os Dados Iniciais**

- Clique com o botão direito em qualquer tabela
- Selecione "View/Edit Data" → "All Rows"
- Você deve ver os dados de exemplo inseridos

### 🧪 Testando Operações CRUD no pgAdmin

**CREATE (Criar) - Inserir novo aluno:**

```sql
INSERT INTO alunos (nome, email, data_nascimento)
VALUES ('Ana Costa', 'ana.costa@example.com', '1997-05-20');
```

**READ (Ler) - Consultar todos os alunos:**

```sql
SELECT * FROM alunos;
```

**UPDATE (Atualizar) - Modificar dados de um aluno:**

```sql
UPDATE alunos
SET nome = 'Ana Costa Silva', email = 'ana.silva@example.com'
WHERE id = 4;
```

**DELETE (Excluir) - Remover um aluno:**

```sql
DELETE FROM alunos WHERE id = 4;
```

**Como executar no pgAdmin:**

1. Clique com o botão direito no banco `alunos_cursos`
2. Selecione "Query Tool"
3. Digite o comando SQL desejado
4. Clique em "Execute" (▶️) ou pressione F5
5. Veja os resultados na aba "Data Output"

### 📋 Script SQL Otimizado

O arquivo `database.sql` foi otimizado para execução direta no pgAdmin e inclui:

✅ **Verificações de Segurança**

- Remove tabelas existentes antes de criar novas
- Evita erros de duplicação

✅ **Estrutura Organizada**

- Seções claramente separadas
- Comentários explicativos
- Consultas de verificação

✅ **Dados de Exemplo**

- 3 cursos pré-cadastrados
- 3 alunos de exemplo
- 4 matrículas de teste

✅ **Consultas de Verificação**

- Conta registros em cada tabela
- Mostra relacionamentos entre alunos e cursos
- Confirma criação bem-sucedida

### 📝 Arquivo de Comandos CRUD

O arquivo `comandos_crud.sql` contém exemplos práticos de todas as operações CRUD:

🔹 **CREATE** - Inserir novos registros
🔹 **READ** - Consultar dados existentes  
🔹 **UPDATE** - Modificar registros
🔹 **DELETE** - Remover registros
🔹 **Consultas Avançadas** - Relatórios e análises

### 🔗 Configuração de Conexão para o Aplicativo

Para conectar sua aplicação ao banco de dados, use as seguintes configurações:

**Parâmetros de Conexão:**

- **Host:** `localhost`
- **Porta:** `5432`
- **Banco de Dados:** `alunos_cursos`
- **Usuário:** `postgres` (ou seu usuário)
- **Senha:** `sua_senha`

**String de Conexão (PostgreSQL):**

```
postgresql://postgres:sua_senha@localhost:5432/alunos_cursos
```

**Exemplo para Node.js com pg:**

```javascript
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "alunos_cursos",
  password: "sua_senha",
  port: 5432
});
```

### Opção 2: Configuração via Linha de Comando

#### 1. Criando o Banco de Dados

```bash
# Conecte-se ao PostgreSQL como superusuário
psql -U postgres

# Crie o banco de dados
CREATE DATABASE alunos_cursos;

# Conecte-se ao banco de dados
\c alunos_cursos
```

#### 2. Executando o Script SQL

```bash
# Execute o script SQL para criar as tabelas e inserir dados iniciais
psql -U seu_usuario -d alunos_cursos -f database.sql
```

## 🔄 Dados Iniciais

O script `database.sql` já inclui alguns dados de exemplo:

### Cursos

1. Desenvolvimento Web Full Stack
2. Ciência de Dados com Python
3. Design de UI/UX para Iniciantes

### Alunos

1. João Silva (joao.silva@example.com)
2. Maria Oliveira (maria.oliveira@example.com)
3. Carlos Pereira (carlos.pereira@example.com)

## 🔍 Consultas Úteis

### Listar todos os cursos de um aluno

```sql
SELECT c.nome_curso, c.descricao, m.data_matricula
FROM cursos c
JOIN matriculas m ON c.id = m.curso_id
WHERE m.aluno_id = 1;
```

### Listar todos os alunos de um curso

```sql
SELECT a.nome, a.email, m.data_matricula
FROM alunos a
JOIN matriculas m ON a.id = m.aluno_id
WHERE m.curso_id = 1;
```

### Contar quantos alunos estão matriculados em cada curso

```sql
SELECT c.nome_curso, COUNT(m.aluno_id) as total_alunos
FROM cursos c
LEFT JOIN matriculas m ON c.id = m.curso_id
GROUP BY c.id, c.nome_curso;
```

## 🔄 Backup e Restauração

### Fazer backup do banco de dados

```bash
pg_dump -U seu_usuario -d alunos_cursos > backup_alunos_cursos_$(date +%Y%m%d).sql
```

### Restaurar banco de dados a partir de um backup

```bash
psql -U seu_usuario -d alunos_cursos < backup_alunos_cursos_20230705.sql
```

## ⚠️ Solução de Problemas Comuns

### Erro: "database does not exist"

Certifique-se de que o banco de dados foi criado corretamente antes de executar o script SQL.

### Erro: "permission denied"

Verifique se o usuário do PostgreSQL tem permissões adequadas para criar bancos de dados e executar consultas.

### Erro: "duplicate key value violates unique constraint"

Isso ocorre quando você tenta inserir um valor duplicado em uma coluna com restrição UNIQUE (como o e-mail dos alunos).

## 📊 Índices Recomendados

Para melhorar o desempenho, considere adicionar os seguintes índices:

```sql
-- Índice para buscas por e-mail
CREATE INDEX idx_alunos_email ON alunos(email);

-- Índice para buscas por nome do curso
CREATE INDEX idx_cursos_nome ON cursos(nome_curso);

-- Índice para consultas de matrículas
CREATE INDEX idx_matriculas_aluno ON matriculas(aluno_id);
CREATE INDEX idx_matriculas_curso ON matriculas(curso_id);
```

## 📅 Manutenção

Para manter o banco de dados otimizado, execute periodicamente:

```sql
-- Analisar e atualizar as estatísticas do banco de dados
ANALYZE;

-- Recriar índices fragmentados
REINDEX DATABASE alunos_cursos;
```
