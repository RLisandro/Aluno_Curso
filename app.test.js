const request = require("supertest");
const { app, resetData } = require("./app");

beforeEach(() => {
  resetData();
});

describe("Testes de Cursos", () => {
  test("Deve criar um curso com sucesso", async () => {
    const res = await request(app).post("/cursos").send({
      nome: "Algoritmos",
      cargaHoraria: 60
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.nome).toBe("Algoritmos");
  });

  test("Não deve criar curso com dados inválidos", async () => {
    const res = await request(app).post("/cursos").send({
      nome: "",
      cargaHoraria: "abc"
    });
    expect(res.statusCode).toBe(400);
  });

  test("Não deve criar curso duplicado", async () => {
    await request(app).post("/cursos").send({
      nome: "Algoritmos",
      cargaHoraria: 60
    });
    const res = await request(app).post("/cursos").send({
      nome: "Algoritmos",
      cargaHoraria: 60
    });
    expect(res.statusCode).toBe(409);
  });

  test("Deve listar todos os cursos", async () => {
    await request(app).post("/cursos").send({ nome: "Sistemas Distribuídos", cargaHoraria: 60 });
    const res = await request(app).get("/cursos");
    expect(res.body.cursos.length).toBeGreaterThan(0);
  });

  test("Deve retornar curso por ID", async () => {
    await request(app).post("/cursos").send({ nome: "Cibersegurança", cargaHoraria: 40 });
    const res = await request(app).get("/cursos/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe("Cibersegurança");
  });

  test("Deve retornar erro ao buscar curso inexistente", async () => {
    const res = await request(app).get("/cursos/999");
    expect(res.statusCode).toBe(404);
  });

  test("Deve atualizar curso existente", async () => {
    await request(app).post("/cursos").send({ nome: "Gestão de TI", cargaHoraria: 30 });
    const res = await request(app).put("/cursos/1").send({ nome: "Gestão de TI Avançada", cargaHoraria: 50 });
    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe("Gestão de TI Avançada");
  });

  test("Deve excluir curso existente", async () => {
    await request(app).post("/cursos").send({ nome: "Frameworks", cargaHoraria: 20 });
    const res = await request(app).delete("/cursos/1");
    expect(res.statusCode).toBe(200);
  });
});

describe("Testes de Alunos", () => {
  test("Deve criar aluno com sucesso", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "João",
      email: "joao@email.com"
    });
    expect(res.statusCode).toBe(201);
  });

  test("Não deve criar aluno com dados inválidos", async () => {
    const res = await request(app).post("/alunos").send({
      nome: "",
      email: ""
    });
    expect(res.statusCode).toBe(400);
  });

  test("Não deve permitir e-mail duplicado", async () => {
    await request(app).post("/alunos").send({
      nome: "João",
      email: "joao@email.com"
    });
    const res = await request(app).post("/alunos").send({
      nome: "Outro",
      email: "joao@email.com"
    });
    expect(res.statusCode).toBe(409);
  });

  test("Deve listar alunos", async () => {
    await request(app).post("/alunos").send({ nome: "João", email: "joao@email.com" });
    const res = await request(app).get("/alunos");
    expect(res.body.alunos.length).toBeGreaterThan(0);
  });

  test("Deve atualizar aluno", async () => {
    await request(app).post("/alunos").send({ nome: "João", email: "joao@email.com" });
    const res = await request(app).put("/alunos/1").send({ nome: "João Atualizado", email: "joao@email.com" });
    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe("João Atualizado");
  });

  test("Deve excluir aluno", async () => {
    await request(app).post("/alunos").send({ nome: "João", email: "joao@email.com" });
    const res = await request(app).delete("/alunos/1");
    expect(res.statusCode).toBe(200);
  });
});

describe("Testes de Matrícula", () => {
  test("Deve matricular aluno em curso", async () => {
    await request(app).post("/alunos").send({ nome: "Maria", email: "maria@email.com" });
    await request(app).post("/cursos").send({ nome: "Inglês", cargaHoraria: 50 });
    const res = await request(app).post("/alunos/1/matricular").send({ cursoId: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.body.aluno.cursos).toContain(1);
  });

  test("Não deve matricular em curso inexistente", async () => {
    await request(app).post("/alunos").send({ nome: "Maria", email: "maria@email.com" });
    const res = await request(app).post("/alunos/1/matricular").send({ cursoId: 999 });
    expect(res.statusCode).toBe(404);
  });

  test("Não deve matricular aluno inexistente", async () => {
    const res = await request(app).post("/alunos/999/matricular").send({ cursoId: 1 });
    expect(res.statusCode).toBe(404);
  });

  test("Não deve matricular aluno já matriculado", async () => {
    await request(app).post("/alunos").send({ nome: "Lucas", email: "lucas@email.com" });
    await request(app).post("/cursos").send({ nome: "Desenvolvimento de Serviços e APIs", cargaHoraria: 30 });
    await request(app).post("/alunos/1/matricular").send({ cursoId: 1 });
    const res = await request(app).post("/alunos/1/matricular").send({ cursoId: 1 });
    expect(res.statusCode).toBe(400);
  });
});

describe("Testes de Remoção de Matrícula", () => {
  test("Deve remover matrícula com sucesso", async () => {
    await request(app).post("/alunos").send({ nome: "Ana", email: "ana@email.com" });
    await request(app).post("/cursos").send({ nome: "Programação", cargaHoraria: 100 });
    await request(app).post("/alunos/1/matricular").send({ cursoId: 1 });
    const res = await request(app).delete("/alunos/1/remover-matricula").send({ cursoId: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.body.aluno.cursos).not.toContain(1);
  });

  test("Não deve remover matrícula inexistente", async () => {
    await request(app).post("/alunos").send({ nome: "Ana", email: "ana@email.com" });
    await request(app).post("/cursos").send({ nome: "Programção Avançada", cargaHoraria: 40 });
    const res = await request(app).delete("/alunos/1/remover-matricula").send({ cursoId: 1 });
    expect(res.statusCode).toBe(400);
  });
});
