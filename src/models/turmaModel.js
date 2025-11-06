const { sql, getPool } = require("../config/db");

async function listarTurmasComCurso() {
  const result = await getPool().request().query(`
    SELECT t.*, c.descricao as curso_nome
    FROM turma t
    JOIN curso c ON t.id_curso = c.id_curso
    ORDER BY c.descricao, t.periodo
  `);
  return result.recordset;
}

async function criarTurma({
  id_curso,
  semestre,
  limite_alunos,
  periodo,
  turno,
  sala,
  data_inicio,
  data_termino,
}) {
  const result = await getPool()
    .request()
    .input("id_curso", sql.Int, id_curso)
    .input("semestre", sql.Int, semestre)
    .input("limite_alunos", sql.Int, limite_alunos)
    .input("periodo", sql.VarChar, periodo)
    .input("turno", sql.VarChar, turno)
    .input("sala", sql.VarChar, sala)
    .input("data_inicio", sql.Date, data_inicio)
    .input("data_termino", sql.Date, data_termino).query(`
      INSERT INTO turma (id_curso, semestre, limite_alunos, periodo, turno, sala, data_inicio, data_termino)
      OUTPUT INSERTED.*
      VALUES (@id_curso, @semestre, @limite_alunos, @periodo, @turno, @sala, @data_inicio, @data_termino)
    `);
  return result.recordset[0];
}

async function atualizarTurma(
  id,
  {
    id_curso,
    semestre,
    limite_alunos,
    periodo,
    turno,
    sala,
    data_inicio,
    data_termino,
  }
) {
  const result = await getPool()
    .request()
    .input("id", sql.Int, id)
    .input("id_curso", sql.Int, id_curso)
    .input("semestre", sql.Int, semestre)
    .input("limite_alunos", sql.Int, limite_alunos)
    .input("periodo", sql.VarChar, periodo)
    .input("turno", sql.VarChar, turno)
    .input("sala", sql.VarChar, sala)
    .input("data_inicio", sql.Date, data_inicio)
    .input("data_termino", sql.Date, data_termino).query(`
      UPDATE turma
      SET id_curso = @id_curso, semestre = @semestre, limite_alunos = @limite_alunos,
          periodo = @periodo, turno = @turno, sala = @sala, data_inicio = @data_inicio, data_termino = @data_termino
      OUTPUT INSERTED.*
      WHERE id_turma = @id
    `);
  return result.recordset[0];
}

async function removerTurma(id) {
  const result = await getPool()
    .request()
    .input("id", sql.Int, id)
    .query("DELETE FROM turma WHERE id_turma = @id");
  return result.rowsAffected[0] > 0;
}

module.exports = {
  listarTurmasComCurso,
  criarTurma,
  atualizarTurma,
  removerTurma,
};
