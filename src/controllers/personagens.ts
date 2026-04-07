import { Request, Response } from "express";
import db from "../../config/database";

function parseId(id: string) {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return null;
  }

  return parsedId;
}

export default {
  list: (_request: Request, response: Response) => {
    try {
      const personagens = db
        .prepare("SELECT * FROM personagens ORDER BY id ASC")
        .all();

      return response.status(200).json(personagens);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao listar personagens." });
    }
  },

  getById: (request: Request, response: Response) => {
    const id = parseId(request.params.id);

    if (!id) {
      return response.status(400).json({ error: "ID invalido." });
    }

    try {
      const personagem = db
        .prepare("SELECT * FROM personagens WHERE id = ?")
        .get(id);

      if (!personagem) {
        return response.status(404).json({ error: "Personagem nao encontrado." });
      }

      return response.status(200).json(personagem);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao buscar personagem." });
    }
  },

  create: (request: Request, response: Response) => {
    const { nome, obra, categoria, descricao, poderPrincipal, idade } = request.body;

    if (!nome || !obra || !categoria) {
      return response.status(400).json({
        error: "Os campos nome, obra e categoria sao obrigatorios.",
      });
    }

    try {
      const result = db
        .prepare(
          `
            INSERT INTO personagens
              (nome, obra, categoria, descricao, poderPrincipal, idade)
            VALUES
              (?, ?, ?, ?, ?, ?)
          `
        )
        .run(
          String(nome),
          String(obra),
          String(categoria),
          descricao ? String(descricao) : null,
          poderPrincipal ? String(poderPrincipal) : null,
          idade ? Number(idade) : null
        );

      const personagem = db
        .prepare("SELECT * FROM personagens WHERE id = ?")
        .get(result.lastInsertRowid);

      return response.status(201).json(personagem);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao cadastrar personagem." });
    }
  },

  update: (request: Request, response: Response) => {
    const id = parseId(request.params.id);

    if (!id) {
      return response.status(400).json({ error: "ID invalido." });
    }

    const { nome, obra, categoria, descricao, poderPrincipal, idade } = request.body;

    if (
      nome === undefined &&
      obra === undefined &&
      categoria === undefined &&
      descricao === undefined &&
      poderPrincipal === undefined &&
      idade === undefined
    ) {
      return response.status(400).json({
        error: "Informe ao menos um campo para atualizar.",
      });
    }

    try {
      const personagemAtual = db
        .prepare("SELECT * FROM personagens WHERE id = ?")
        .get(id) as Record<string, unknown> | undefined;

      if (!personagemAtual) {
        return response.status(404).json({ error: "Personagem nao encontrado." });
      }

      db.prepare(
        `
          UPDATE personagens
          SET
            nome = ?,
            obra = ?,
            categoria = ?,
            descricao = ?,
            poderPrincipal = ?,
            idade = ?,
            updatedAt = CURRENT_TIMESTAMP
          WHERE id = ?
        `
      ).run(
        nome !== undefined ? String(nome) : personagemAtual.nome,
        obra !== undefined ? String(obra) : personagemAtual.obra,
        categoria !== undefined ? String(categoria) : personagemAtual.categoria,
        descricao !== undefined ? (descricao === null ? null : String(descricao)) : personagemAtual.descricao,
        poderPrincipal !== undefined
          ? (poderPrincipal === null ? null : String(poderPrincipal))
          : personagemAtual.poderPrincipal,
        idade !== undefined ? (idade === null ? null : Number(idade)) : personagemAtual.idade,
        id
      );

      const personagemAtualizado = db
        .prepare("SELECT * FROM personagens WHERE id = ?")
        .get(id);

      return response.status(200).json(personagemAtualizado);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao atualizar personagem." });
    }
  },

  delete: (request: Request, response: Response) => {
    const id = parseId(request.params.id);

    if (!id) {
      return response.status(400).json({ error: "ID invalido." });
    }

    try {
      const personagem = db
        .prepare("SELECT * FROM personagens WHERE id = ?")
        .get(id);

      if (!personagem) {
        return response.status(404).json({ error: "Personagem nao encontrado." });
      }

      db.prepare("DELETE FROM personagens WHERE id = ?").run(id);

      return response.status(200).json({
        message: "Personagem deletado com sucesso.",
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao deletar personagem." });
    }
  },
};
