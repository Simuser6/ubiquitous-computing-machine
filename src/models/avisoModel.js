const sql = require("mssql");

/**
 * Modelo responsável pela interação com a tabela Avisos
 */

const getAll = async (pool) => {
  console.log("Model recebeu pool?", !!pool);
  const result = await pool.request().query(`
    SELECT id, titulo, descricao, autor, data_publicacao, data_expiracao, publico_alvo
    FROM Avisos
  `);
  return result.recordset;
};

async function getById(pool, id) {
  const result = await pool.request()
    .input("id", sql.Int, id)
    .query("SELECT * FROM Avisos WHERE id = @id");
  return result.recordset[0];
}

async function create(pool, aviso) {
  const { titulo, descricao, autor, data_expiracao, publico_alvo } = aviso;
  await pool.request()
    .input("titulo", sql.VarChar, titulo)
    .input("descricao", sql.VarChar, descricao)
    .input("autor", sql.VarChar, autor)
    .input("data_expiracao", sql.Date, data_expiracao || null)
    .input("publico_alvo", sql.VarChar, publico_alvo || null)
    .query(`
      INSERT INTO Avisos (titulo, descricao, autor, data_publicacao, data_expiracao, publico_alvo)
      VALUES (@titulo, @descricao, @autor, GETDATE(), @data_expiracao, @publico_alvo)
    `);
}

async function update(pool, id, aviso) {
  const { titulo, descricao, data_expiracao, publico_alvo } = aviso;
  const result = await pool.request()
    .input("id", sql.Int, id)
    .input("titulo", sql.VarChar, titulo)
    .input("descricao", sql.VarChar, descricao)
    .input("data_expiracao", sql.Date, data_expiracao || null)
    .input("publico_alvo", sql.VarChar, publico_alvo || null)
    .query(`
      UPDATE Avisos
      SET titulo=@titulo, descricao=@descricao, data_expiracao=@data_expiracao, publico_alvo=@publico_alvo
      WHERE id=@id
    `);
  return result.rowsAffected[0];
}

async function remove(pool, id) {
  const result = await pool.request()
    .input("id", sql.Int, id)
    .query("DELETE FROM Avisos WHERE id=@id");
  return result.rowsAffected[0];
}

module.exports = { getAll, getById, create, update, remove };
