import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import pool from "./src/database/db.js";
import usuariosRoutes from "./src/routers/usuarioRouter.js";
import alunosRouter from "./src/routers/alunosRoute.js";
import cobrancasRouter from "./src/routers/cobrancasRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", usuariosRoutes);
app.use("/api/alunos", alunosRouter);
app.use("/api/cobrancas", cobrancasRouter);

app.listen(PORT, () => {
    console.log(`SERVIDOR RODANDO NA PORTA ${PORT}`);
});
