CREATE TABLE cobrancas(
  id SERIAL PRIMARY KEY,
  aluno_id INT NOT NULL,
  valor NUMERIC(10,2) NOT NULL,
  mes INT NOT NULL CHECK (mes BETWEEN 1 AND 12),
  pago BOOLEAN DEFAULT FALSE,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT fk_aluno
  FOREIGN KEY (aluno_id)
  REFERENCES alunos(id)
  ON DELETE CASCADE
);

-- INSERT INTO alunos(nome, classe, disciplina, usuario_id)
-- VALUES('Marla',12,'Matematica', 1);
-- DELETE FROM alunos WHERE id = 3