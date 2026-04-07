-- CreateTable
CREATE TABLE "CursosOnAlunos" (
    "cursoId" INTEGER NOT NULL,
    "alunoId" INTEGER NOT NULL,

    PRIMARY KEY ("cursoId", "alunoId"),
    CONSTRAINT "CursosOnAlunos_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Cursos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CursosOnAlunos_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Alunos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
