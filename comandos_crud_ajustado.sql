-- =====================================================================================
-- Buscar todos os registros da tabela alunos matriculados: por email e curso 
-- =======================================================================================

-- Buscar todos os registros da tabela alunos
SELECT * FROM alunos;

-- =====================================================================================
--  Buscar todos os registros da tabela alunos onde o valor da coluna email 
SELECT * FROM alunos WHERE email = 'ana.costa@example.com';

-- Buscar todos os registros da tabela cursos
SELECT * FROM cursos WHERE nome_curso = 'Programação Mobile com React Native';

-- Buscar todos os registros da tabela matriculas
SELECT * FROM matriculas WHERE aluno_id = (SELECT id FROM alunos WHERE email = 'ana.costa@example.com')

-- Buscar todos os registros da tabela matriculas
SELECT * FROM matriculas WHERE curso_id = (SELECT id FROM cursos WHERE nome_curso = 'Programação Mobile com React Native');

-- Buscar todos os registros da tabela matriculas
SELECT * FROM matriculas WHERE aluno_id = (SELECT id FROM alunos WHERE email = 'ana.costa@example.com') AND curso_id = (SELECT id FROM cursos WHERE nome_curso = 'Programação Mobile com React Native');

--  Ver todos os registros de uma tabela
SELECT * FROM nome_da_tabela; 
-- Ver todos os registros da tabela alunos
SELECT * FROM alunos;

-- Ver todos os registros da tabela cursos
SELECT * FROM cursos;

-- Ver pelo ID 
SELECT * FROM nome_da_tabela WHERE id = valor_do_id;
-- Exemplo: 
SELECT * FROM alunos WHERE id = 1;

-- Ver curso pelo ID 
SELECT * FROM cursos WHERE id = valor_do_id;
-- Exemplo: 
SELECT * FROM cursos WHERE id = 1;  


-- Ver todos os registros da tabela matriculas
SELECT * FROM matriculas;
-- Se quiser apenas colunas específicas, 
-- liste-as separadas por vírgula, como por exemplo:

-- nome, email FROM alunos;
SELECT nome, email FROM alunos;
--========================================================================================
-- Fazer os Cruds de cada tabela
-- =====================================================
-- CREATE (CRIAR) - OPERAÇÕES DE INSERÇÃO
-- =====================================================

-- 1. Inserir novo aluno
INSERT INTO alunos (nome, email, data_nascimento) 
VALUES ('Ana Costa', 'ana.costa@example.com', '1997-05-20');

-- 2. Inserir novo curso: Observação: A Letra "E" indica que o nome 
-- do curso contém acentuação: como por exemplo: Programação Mobile com React Native
INSERT INTO cursos (nome_curso, descricao) 
VALUES (E'Programação Mobile com React Native', 'Desenvolva aplicativos móveis multiplataforma');

-- Cursos pré matriculados
-- ('Desenvolvimento Web Full Stack', 'Aprenda a criar aplicações web completas, do front-end ao back-end.'),
-- ('Ciência de Dados com Python', 'Domine as principais bibliotecas de Python para análise e visualização de dados.'),
-- ('Design de UI/UX para Iniciantes', 'Conceitos e ferramentas essenciais para criar interfaces amigáveis e eficazes.');

-- 3. Matricular aluno em curso (usando subconsultas para garantir o id correto)
INSERT INTO matriculas (aluno_id, curso_id) 
VALUES (
    (SELECT id FROM alunos WHERE email = 'ana.costa@example.com'),
    (SELECT id FROM cursos WHERE nome_curso = 'Programação Mobile com React Native')
);

-- Alunos já matriculados 
-- ('João Silva', 'joao.silva@example.com', '1995-03-15'),
-- ('Maria Oliveira', 'maria.oliveira@example.com', '1998-07-22'),
-- ('Carlos Pereira', 'carlos.pereira@example.com', '1999-01-10');


-- Futuros alunos serão matriculados 

-- ('Juliana Santos', 'juliana.santos@example.com', '1996-09-14'),
-- ('Rafael Costa', 'rafael.costa@example.com', '1997-11-05'),
-- ('Fernanda Lima', 'fernanda.lima@example.com', '1998-04-22'),
-- ('Lucas Oliveira', 'lucas.oliveira@example.com', '1999-08-30')




-- =====================================================
-- READ (LER) - OPERAÇÕES DE CONSULTA
-- =====================================================


-- 1. Listar todos os alunos
SELECT * FROM alunos ORDER BY nome;

-- 2. Listar todos os cursos
SELECT * FROM cursos ORDER BY nome_curso;

-- 3. Listar todas as matrículas com detalhes
SELECT 
    a.nome as aluno,
    c.nome_curso as curso,
    m.data_matricula
FROM matriculas m
JOIN alunos a ON m.aluno_id = a.id
JOIN cursos c ON m.curso_id = c.id
ORDER BY a.nome, c.nome_curso;



-- 4. Buscar aluno por email
SELECT * FROM alunos WHERE email = 'ana.costa@example.com';

-- 5. Buscar cursos que contenham "Python"
SELECT * FROM cursos WHERE nome_curso ILIKE '%Python%';

-- =====================================================
-- UPDATE (ATUALIZAR) - OPERAÇÕES DE MODIFICAÇÃO
-- =====================================================

-- 1. Atualizar dados de um aluno
UPDATE alunos 
SET nome = 'Ana Costa Silva', 
    email = 'ana.silva@example.com' 
WHERE email = 'ana1.costa@example.com';

-- 2. Atualizar descrição de um curso
UPDATE cursos 
SET descricao = 'Curso completo de React Native para iniciantes e intermediários' 
WHERE nome_curso = 'Programação Mobile com React Native';

-- 3. Verificar as alterações
SELECT * FROM alunos WHERE email = 'ana.silva@example.com';
SELECT * FROM cursos WHERE nome_curso = 'Programação Mobile com React Native';

-- =====================================================
-- DELETE (EXCLUIR) - OPERAÇÕES DE REMOÇÃO
-- =====================================================

-- 1. Primeiro, veja as matrículas existentes para identificar os IDs
SELECT m.*, a.nome as nome_aluno, c.nome_curso 
FROM matriculas m
JOIN alunos a ON m.aluno_id = a.id
JOIN cursos c ON m.curso_id = c.id;

-- 2. Remover matrícula específica por IDs
-- Substitua os valores de exemplo (1 e 1) pelos IDs reais
DELETE FROM matriculas 
WHERE aluno_id = 1  -- Substitua pelo ID do aluno
  AND curso_id = 1; -- Substitua pelo ID do curso

-- 3. Remover aluno por ID (isso também remove suas matrículas devido ao CASCADE)
-- Primeiro, veja a lista de alunos para encontrar o ID
SELECT id, nome, email FROM alunos ORDER BY id;

-- Depois, remova o aluno pelo ID
DELETE FROM alunos WHERE id = 1;  -- Substitua pelo ID do aluno

-- 4. Remover curso por ID (isso também remove as matrículas relacionadas)
-- Primeiro, veja a lista de cursos para encontrar o ID
SELECT id, nome_curso FROM cursos ORDER BY id;

-- Depois, remova o curso pelo ID
DELETE FROM cursos WHERE id = 1;  -- Substitua pelo ID do curso

-- 5. Verificar remoções e listar o que permaneceu
-- Verificar alunos
SELECT 'ALUNOS REGISTRADOS' as status;
SELECT id, nome, email FROM alunos ORDER BY id;

-- Verificar cursos
SELECT 'CURSOS REGISTRADOS' as status;
SELECT id, nome_curso, descricao FROM cursos ORDER BY id;

-- Verificar matrículas atuais
SELECT 'MATRÍCULAS ATUAIS' as status;
SELECT m.*, a.nome as aluno, c.nome_curso as curso
FROM matriculas m
JOIN alunos a ON m.aluno_id = a.id
JOIN cursos c ON m.curso_id = c.id
ORDER BY a.nome, c.nome_curso;

-- Verificar se há alunos sem matrículas
SELECT 'ALUNOS SEM MATRÍCULAS' as status;
SELECT a.id, a.nome, a.email
FROM alunos a
LEFT JOIN matriculas m ON a.id = m.aluno_id
WHERE m.aluno_id IS NULL
ORDER BY a.nome;

-- Verificar cursos sem alunos matriculados
SELECT 'CURSOS SEM ALUNOS' as status;
SELECT c.id, c.nome_curso, c.descricao
FROM cursos c
LEFT JOIN matriculas m ON c.id = m.curso_id
WHERE m.curso_id IS NULL
ORDER BY c.nome_curso;

-- =====================================================
-- MENSAGEM FINAL
-- =====================================================
SELECT 'Testes CRUD concluídos com sucesso! Verifique os resultados acima.' as status; 