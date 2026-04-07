import http from "http";

import app from "./app";

const server = http.createServer(app);
const port = Number(process.env.PORT) || 8080;

server.listen(port, () => console.log(`Servidor escutando na porta ${port}`));
