import express from "express";
import { verificarToken } from "../middleware/auth.js";
import { criarAluno, listarAlunos } from "../controllers/alunosController.js";

const router = express.Router();
router.use(verificarToken);

router.post("/", criarAluno);
router.get("/", listarAlunos);

export default router;
