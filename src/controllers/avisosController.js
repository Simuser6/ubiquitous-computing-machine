const Aviso = require("../models/avisoModel");

/**
 * Controlador responsável por tratar as requisições de avisos
 */

async function listar(req, res) {
  try {
    const avisos = await Aviso.getAll(req.pool);
    res.json(avisos);
    console.log("Controller recebeu pool?", !!req.pool);
  } catch (err) {
    console.error("Erro ao listar avisos:", err);
    res.status(500).send("Erro ao listar avisos");
    console.log("req.pool existe?", !!req.pool);

  }
}

async function obter(req, res) {
  try {
    const aviso = await Aviso.getById(req.pool, req.params.id);
    if (!aviso) return res.status(404).json({ error: "Aviso não encontrado." });
    res.json(aviso);
  } catch (error) {
    console.error("Erro ao obter aviso:", error);
    res.status(500).json({ error: "Erro ao obter aviso." });
  }
}

async function criar(req, res) {
  try {
    const { titulo, descricao, autor } = req.body;
    if (!titulo || !descricao || !autor) {
      return res.status(400).json({ error: "Campos obrigatórios: título, descrição e autor." });
    }

    await Aviso.create(req.pool, req.body);
    res.status(201).json({ message: "Aviso criado com sucesso." });
  } catch (error) {
    console.error("Erro ao criar aviso:", error);
    res.status(500).json({ error: "Erro ao criar aviso." });
  }
}

async function atualizar(req, res) {
  try {
    const atualizado = await Aviso.update(req.pool, req.params.id, req.body);
    if (!atualizado) return res.status(404).json({ error: "Aviso não encontrado." });
    res.json({ message: "Aviso atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar aviso:", error);
    res.status(500).json({ error: "Erro ao atualizar aviso." });
  }
}

async function excluir(req, res) {
  try {
    const deletado = await Aviso.remove(req.pool, req.params.id);
    if (!deletado) return res.status(404).json({ error: "Aviso não encontrado." });
    res.json({ message: "Aviso excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir aviso:", error);
    res.status(500).json({ error: "Erro ao excluir aviso." });
  }
}

module.exports = { listar, obter, criar, atualizar, excluir };
