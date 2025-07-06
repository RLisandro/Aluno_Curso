const express = require("express");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres", // Altere para seu usuário do banco
  host: "localhost",
  database: "aluno_curso", // Altere para o nome do seu banco
  password: "200511025", // Altere para sua senha
  port: 5432
});

const app = express();
app.use(express.json());

// Rotas de Cursos (CRUD)
app.get("/cursos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cursos ORDER BY nome_curso");
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao buscar cursos", details: err.message });
  }
});

app.get("/cursos/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cursos WHERE id = $1", [
      req.params.id
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Curso não encontrado." });
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao buscar curso", details: err.message });
  }
});

app.post("/cursos", async (req, res) => {
  const { nome_curso, descricao } = req.body;
  if (
    !nome_curso ||
    typeof nome_curso !== "string" ||
    nome_curso.trim() === ""
  ) {
    return res
      .status(400)
      .json({ message: "O campo nome_curso é obrigatório." });
  }
  try {
    // Verifica duplicidade
    const duplicado = await pool.query(
      "SELECT 1 FROM cursos WHERE LOWER(nome_curso) = LOWER($1)",
      [nome_curso]
    );
    if (duplicado.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "Já existe um curso com este nome." });
    }
    // Insere no banco
    const result = await pool.query(
      "INSERT INTO cursos (nome_curso, descricao) VALUES ($1, $2) RETURNING *",
      [nome_curso, descricao]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao inserir curso", details: err.message });
  }
});

app.put("/cursos/:id", async (req, res) => {
  const { nome_curso, descricao } = req.body;
  try {
    const result = await pool.query(
      "UPDATE cursos SET nome_curso = $1, descricao = $2 WHERE id = $3 RETURNING *",
      [nome_curso, descricao, req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Curso não encontrado." });
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar curso", details: err.message });
  }
});

app.delete("/cursos/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM cursos WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Curso não encontrado." });
    res.json({ message: "Curso excluído com sucesso." });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao excluir curso", details: err.message });
  }
});

// Rotas de Alunos (CRUD)
app.get("/alunos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM alunos ORDER BY nome");
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao buscar alunos", details: err.message });
  }
});

app.get("/alunos/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM alunos WHERE id = $1", [
      req.params.id
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Aluno não encontrado." });
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao buscar aluno", details: err.message });
  }
});

app.post("/alunos", async (req, res) => {
  const { nome, email, data_nascimento } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ message: "Nome e email são obrigatórios." });
  }
  try {
    // Verifica duplicidade
    const duplicado = await pool.query(
      "SELECT 1 FROM alunos WHERE LOWER(email) = LOWER($1)",
      [email]
    );
    if (duplicado.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "Já existe um aluno com este email." });
    }
    // Insere no banco
    const result = await pool.query(
      "INSERT INTO alunos (nome, email, data_nascimento) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, data_nascimento]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao inserir aluno", details: err.message });
  }
});

app.put("/alunos/:id", async (req, res) => {
  const { nome, email, data_nascimento } = req.body;
  try {
    const result = await pool.query(
      "UPDATE alunos SET nome = $1, email = $2, data_nascimento = $3 WHERE id = $4 RETURNING *",
      [nome, email, data_nascimento, req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Aluno não encontrado." });
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar aluno", details: err.message });
  }
});

app.delete("/alunos/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM alunos WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Aluno não encontrado." });
    res.json({ message: "Aluno excluído com sucesso." });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao excluir aluno", details: err.message });
  }
});

// Matrícula de aluno em curso
app.post("/alunos/:id/matricular", async (req, res) => {
  const alunoId = req.params.id;
  const { cursoId } = req.body;
  try {
    // Verifica se aluno e curso existem
    const aluno = await pool.query("SELECT * FROM alunos WHERE id = $1", [
      alunoId
    ]);
    const curso = await pool.query("SELECT * FROM cursos WHERE id = $1", [
      cursoId
    ]);
    if (aluno.rows.length === 0)
      return res.status(404).json({ message: "Aluno não encontrado." });
    if (curso.rows.length === 0)
      return res.status(404).json({ message: "Curso não encontrado." });

    // Faz a matrícula
    await pool.query(
      "INSERT INTO matriculas (aluno_id, curso_id) VALUES ($1, $2)",
      [alunoId, cursoId]
    );
    res.json({ message: "Aluno matriculado com sucesso!" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao matricular aluno", details: err.message });
  }
});

// Remover matrícula de um curso por aluno
app.delete("/alunos/:id/remover-matricula", async (req, res) => {
  const alunoId = req.params.id;
  const { cursoId } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM matriculas WHERE aluno_id = $1 AND curso_id = $2 RETURNING *",
      [alunoId, cursoId]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Matrícula não encontrada para este aluno e curso." });
    }
    res.json({ message: "Matrícula removida com sucesso." });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao remover matrícula", details: err.message });
  }
});

module.exports = { app };
