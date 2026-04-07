import { Response } from "express";
import prismaErrorCodes from "../../config/prismaErrorCodes.json";
import { Prisma } from "../../generated/prisma/client";

export function handleError(error: unknown, response: Response) {
  console.error(error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const statusCode =
      prismaErrorCodes[error.code as keyof typeof prismaErrorCodes] ?? 500;

    return response.status(statusCode).json({
      error: "Erro ao processar a requisicao.",
      code: error.code,
      details: error.message,
    });
  }

  return response.status(500).json({
    error: "Erro interno do servidor.",
  });
}
