-- =====================================================
-- SCRIPT SQL PARA CRIAÇÃO DO BANCO DE DADOS ALUNOS_CURSOS
-- Execute este script no pgAdmin após criar o banco 'alunos_cursos'
-- =====================================================

-- Verificar se as tabelas já existem e removê-las se necessário
DROP TABLE IF EXISTS matriculas CASCADE;
DROP TABLE IF EXISTS alunos CASCADE;
DROP TABLE IF EXISTS cursos CASCADE;

-- =====================================================
-- CRIAÇÃO DAS TABELAS
-- =====================================================

-- Tabela de Cursos
CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    nome_curso VARCHAR(255) NOT NULL,
    descricao TEXT
);

-- Tabela de Alunos
CREATE TABLE alunos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    data_nascimento DATE
);

-- Tabela de Matrículas (Tabela de Junção)
CREATE TABLE matriculas (
    aluno_id INTEGER NOT NULL,
    curso_id INTEGER NOT NULL,
    data_matricula TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (aluno_id, curso_id),
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
);

-- =====================================================
-- INSERÇÃO DE DADOS DE EXEMPLO
-- =====================================================

-- Inserir cursos de exemplo
INSERT INTO cursos (nome_curso, descricao) VALUES
(E'Desenvolvimento Web Full Stack', E'Aprenda a criar aplicações web completas, do front-end ao back-end.'),
(E'Ciência de Dados com Python', E'Domine as principais bibliotecas de Python para análise e visualização de dados.'),
(E'Design de UI/UX para Iniciantes', E'Conceitos e ferramentas essenciais para criar interfaces amigáveis e eficazes.');

-- Inserir alunos de exemplo
INSERT INTO alunos (nome, email, data_nascimento) VALUES
('João Silva', 'joao.silva@example.com', '1995-03-15'),
('Maria Oliveira', 'maria.oliveira@example.com', '1998-07-22'),
('Carlos Pereira', 'carlos.pereira@example.com', '1999-01-10');

-- Inserir matrículas de exemplo
INSERT INTO matriculas (aluno_id, curso_id) VALUES
(1, 1), -- João Silva no Desenvolvimento Web
(1, 2), -- João Silva em Ciência de Dados
(2, 1), -- Maria Oliveira no Desenvolvimento Web
(3, 3); -- Carlos Pereira em Design de UI/UX

-- =====================================================
-- CONSULTAS DE VERIFICAÇÃO
-- =====================================================

-- Verificar se os dados foram inseridos corretamente
SELECT 'CURSOS' as tabela, COUNT(*) as total_registros FROM cursos
UNION ALL
SELECT 'ALUNOS' as tabela, COUNT(*) as total_registros FROM alunos
UNION ALL
SELECT 'MATRICULAS' as tabela, COUNT(*) as total_registros FROM matriculas;

-- Consulta de exemplo: Alunos e seus cursos matriculados
SELECT 
    a.nome AS nome_aluno,
    c.nome_curso AS curso_matriculado,
    m.data_matricula
FROM 
    alunos a
JOIN 
    matriculas m ON a.id = m.aluno_id
JOIN 
    cursos c ON m.curso_id = c.id
ORDER BY 
    a.nome, c.nome_curso;

-- =====================================================
-- MENSAGEM DE CONFIRMAÇÃO
-- =====================================================
SELECT 'Banco de dados criado com sucesso! Tabelas: cursos, alunos, matriculas' as status;
