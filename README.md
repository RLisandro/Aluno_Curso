# Projeto Alunos e Cursos

Este é um projeto desenvolvido com Node.js e Express para gerenciar cursos e alunos, incluindo funcionalidades de CRUD (Create, Read, Update, Delete) para cursos e alunos, além da capacidade de matricular alunos em cursos.

## Requisitos

Antes de executar o projeto, você precisa ter as seguintes ferramentas instaladas em sua máquina:

- **Node.js** (versão 14 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

Você pode verificar se tem o Node.js e npm instalados com os seguintes comandos:

```bash
node -v
npm -v
npm init -y
npm install express
npm install pg
npm install --save-dev jest
npm install --save-dev supertest

Se não estiverem instalados, você pode baixar o Node.js aqui e o npm será instalado automaticamente.

Instalação
Clone o repositório do projeto:

bash
Copiar
Editar
git clone https://github.com/SEU-USUARIO/alunoEcursos.git
Navegue até a pasta do projeto:

bash
Copiar
Editar
cd alunoEcursos
Instale as dependências do projeto:

bash
Copiar
Editar
npm install
Execução do Servidor
Após a instalação das dependências, você pode iniciar o servidor com o seguinte comando:

bash
Copiar
Editar
npm start
Isso iniciará o servidor na porta 3001 por padrão. Se a porta 3001 já estiver sendo usada, o servidor tentará usar a porta 3002. O servidor ficará disponível em http://localhost:3001.

API - Cursos
Testes para a Rota de Cursos

GET /cursos
•	Cenário 1 (Positivo): Verificar se a lista de cursos é retornada corretamente.
o	Requisição: GET para /cursos
o	Resposta Esperada: 200 OK, com uma lista vazia ou com cursos cadastrados.

•	Cenário 2 (Negativo): Se não houver cursos cadastrados, a resposta deve retornar uma lista vazia.
o	Requisição: GET para /cursos
o	Resposta Esperada: 200 OK, com o array cursos vazio.

GET /cursos/{id}
•	Cenário 1 (Positivo): Verificar se um curso específico é retornado corretamente.
o	Requisição: GET para /cursos/{id} onde {id} é um ID válido.
o	Resposta Esperada: 200 OK, com os dados do curso correspondente.

•	Cenário 2 (Negativo): Tentar acessar um curso que não existe.
o	Requisição: GET para /cursos/999 (onde o curso com ID 999 não existe).
o	Resposta Esperada: 404 NOT FOUND, com a mensagem Curso não encontrado.

POST /cursos
•	Cenário 1 (Positivo): Criar um curso com sucesso.
o	Requisição: POST para /cursos com body:
json
Copiar código
{
  "nome": "Nome do Curso",
  "cargaHoraria": 60
}
o	Resposta Esperada: 201 CREATED, com o novo curso no corpo da resposta.

•	Cenário 2 (Negativo): Tentar criar um curso com campos ausentes.
o	Requisição: POST para /cursos com body:
json
Copiar código
{
  "nome": "Nome do Cruso Inexistente"
}
o	Resposta Esperada: 400 BAD REQUEST, com a mensagem de erro: Nome e cargaHoraria (número) são obrigatórios.

•	Cenário 3 (Negativo): Tentar criar um curso com cargaHorária inválida.
o	Requisição: POST para /cursos com body:
json
Copiar código
{
  "nome": "Nome do Curso",
  "cargaHoraria": "forty"
}
o	Resposta Esperada: 400 BAD REQUEST, com a mensagem de erro: Nome e cargaHoraria (número) são obrigatórios.

•	Cenário 4 (Negativo): Tentar criar um curso com nome duplicado.
o	Requisição: POST para /cursos com body:
json
Copiar código
{
  "nome": "Nome do Curso",
  "cargaHoraria": 60
}
o	Resposta Esperada: 409 CONFLICT, com a mensagem de erro: Já existe um curso com este nome.

PUT /cursos/{id}
•	Cenário 1 (Positivo): Atualizar um curso com sucesso.
o	Requisição: PUT para /cursos/1 com body:
json
Copiar código
{
  "nome": "Nome do Curso Avançado",
  "cargaHoraria": 80
}
o	Resposta Esperada: 200 OK, com os dados atualizados do curso.

•	Cenário 2 (Negativo): Tentar atualizar um curso que não existe.
o	Requisição: PUT para /cursos/999 com body:
json
Copiar código
{
  "nome": "Nome do Curso Avançado",
  "cargaHoraria": 60
}
o	Resposta Esperada: 404 NOT FOUND, com a mensagem de erro: Curso não encontrado.

•	Cenário 3 (Negativo): Tentar atualizar com campos inválidos.
o	Requisição: PUT para /cursos/1 com body:
json
Copiar código
{
  "nome": "Nome do Curso Avançado",
  "cargaHoraria": "sixty"
}
o	Resposta Esperada: 400 BAD REQUEST, com a mensagem de erro: Nome e cargaHoraria (número) são obrigatórios.
DELETE /cursos/{id}

•	Cenário 1 (Positivo): Excluir um curso com sucesso.
o	Requisição: DELETE para /cursos/1
o	Resposta Esperada: 200 OK, com a mensagem de sucesso: Curso excluído com sucesso.

•	Cenário 2 (Negativo): Tentar excluir um curso que não existe.
o	Requisição: DELETE para /cursos/999
o	Resposta Esperada: 404 NOT FOUND, com a mensagem de erro: Curso não encontrado.
_____________________________________________________________________________________________________________________________
API - Alunos
Testes para a Rota de Alunos

GET /alunos
•	Cenário 1 (Positivo): Verificar se a lista de alunos é retornada corretamente.
o	Requisição: GET para /alunos
o	Resposta Esperada: 200 OK, com a lista de alunos (que pode estar vazia inicialmente).
POST /alunos
•	Cenário 1 (Positivo): Criar um aluno com sucesso.
o	Requisição: POST para /alunos com body:
json
Copiar código
{
  "nome": "João Silva",
  "email": "joao@example.com"
}
o	Resposta Esperada: 201 CREATED, com os dados do novo aluno.

•	Cenário 2 (Negativo): Tentar criar um aluno sem nome ou email.
o	Requisição: POST para /alunos com body:
json
Copiar código
{
  "nome": "João Silva"
}
o	Resposta Esperada: 400 BAD REQUEST, com a mensagem de erro: Nome e email são obrigatórios.
PUT /alunos/{id}

•	Cenário 1 (Positivo): Atualizar os dados de um aluno.
o	Requisição: PUT para /alunos/1 com body:
json
Copiar código
{
  "nome": "João Silva Jr.",
  "email": "joaojr@example.com"
}
o	Resposta Esperada: 200 OK, com os dados atualizados do aluno.

•	Cenário 2 (Negativo): Tentar atualizar um aluno que não existe.
o	Requisição: PUT para /alunos/999 com body:
json
Copiar código
{
  "nome": "João Silva Jr.",
  "email": "joaojr@example.com"
}
o	Resposta Esperada: 404 NOT FOUND, com a mensagem de erro: Aluno não encontrado.
DELETE /alunos/{id}
•	Cenário 1 (Positivo): Excluir um aluno com sucesso.
o	Requisição: DELETE para /alunos/1
o	Resposta Esperada: 200 OK, com a mensagem de sucesso: Aluno excluído com sucesso.

•	Cenário 2 (Negativo): Tentar excluir um aluno que não existe.
o	Requisição: DELETE para /alunos/999
o	Resposta Esperada: 404 NOT FOUND, com a mensagem de erro: Aluno não encontrado.

POST /alunos/{id}/matricular
•	Cenário 1 (Positivo): Matrícula de um aluno em um curso com sucesso.
o	Requisição: POST para /alunos/1/matricular com body:
json
Copiar código
{
  "cursoId": 1
}
o	Resposta Esperada: 200 OK, com a mensagem de sucesso: Aluno matriculado com sucesso!

•	Cenário 2 (Negativo): Matrícula de um aluno em um curso que não existe.
o	Requisição: POST para /alunos/1/matricular com body:
json
Copiar código
{
  "cursoId": 999
}
o	Resposta Esperada: 404 NOT FOUND, com a mensagem de erro: Curso não encontrado.

•	Cenário 3 (Negativo): Matrícula de um aluno que já está matriculado no curso.
o	Requisição: POST para /alunos/1/matricular com body:
json
Copiar código
{
  "cursoId": 1
}
o	Resposta Esperada: 400 BAD REQUEST, com a mensagem de erro: Aluno já está matriculado neste curso.
_____________________________________________________________________________________________________________________________
Erros Comuns
400 - Bad Request: Caso o corpo da requisição não esteja correto (ex: campos obrigatórios faltando ou tipo de dado incorreto).

404 - Not Found: Caso o recurso solicitado não exista (ex: curso ou aluno com o ID não encontrado).

409 - Conflict: Caso um aluno já esteja matriculado no curso.
_____________________________________________________________________________________________________________________________
Testes
O projeto utiliza o framework de testes Jest para testar as APIs. Para rodar os testes, siga os seguintes passos:

Instale as dependências de testes:

bash
Copiar
Editar
npm install --save-dev jest supertest
Para rodar os testes, use o comando:

bash
Copiar
Editar
npm test
Executando os testes com o Jest
Jest executará automaticamente os testes definidos no arquivo app.test.js. O servidor será iniciado e os testes serão executados para testar o CRUD de cursos, alunos e a matrícula de alunos nos cursos.

Observação: Certifique-se de que não há nenhuma instância do servidor rodando na porta 3001 antes de iniciar os testes. Caso a porta esteja em uso, será gerado o erro EADDRINUSE. Para resolver, feche a instância existente ou altere a porta usada no código de teste (no arquivo app.test.js).

Contribuição
Se você deseja contribuir para o projeto, fique à vontade! Para isso, siga os seguintes passos:

Faça um fork do repositório.

Crie uma branch para sua modificação.

Faça suas mudanças e comite-as.

Abra um pull request descrevendo suas mudanças.

markdown
Copiar
Editar

### Explicação das seções:

1. **Requisitos**: Instruções para garantir que o ambiente esteja pronto para executar o projeto.
2. **Instalação**: Passos para clonar o repositório e instalar as dependências.
3. **Execução do Servidor**: Como iniciar o servidor para rodar a API.
4. **API**: Descrição detalhada de cada endpoint da API.
5. **Testes**: Como executar os testes do projeto usando o Jest e Supertest.
6. **Contribuição**: Como colaborar com o projeto.
7. **Licença**: Informações sobre a licença do projeto.
