# Trabalho desenvolvimento de sistemas

Este trabalho consiste em montar um CRUD para personagens de desenho, anime ou serie.

# Tecnologias utilizadas

Node.js
 Express
 Prisma ORM
 SQLite
 TypeScript

# Como rodar o projeto na sua maquina

 Instale as dependencias com `npm install`
 Crie um arquivo `.env` na raiz do projeto com `DATABASE_URL="file:./dev.db"`
 Gere o client do Prisma com `npm run prisma:generate`
 Crie o banco com `npm run prisma:push`
 Inicie o servidor com `npm run dev`


# Estrutura do projeto

 `src/index.ts`: inicializa o servidor
 `src/app.ts`: configura o Express e os middlewares
 `src/routes.ts`: concentra as rotas da API
 `src/controllers/personagens.ts`: contem as regras do CRUD
 `config/prisma.ts`: conexao com o banco de dados
 `prisma/schema.prisma`: modelagem da tabela de personagens

# Observacoes importantes

 O arquivo `.env` nao deve ser enviado para o GitHub
 O banco `dev.db` nao deve ser enviado para o GitHub
 A pasta `node_modules` nao deve ser enviada para o GitHub
