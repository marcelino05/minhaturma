import express from "express";
import { verificarToken } from "../middleware/auth.js";
import { criarCobrancas } from "../controllers/cobrancasController.js";

const router = express.Router();
router.use(verificarToken);

router.post("/", criarCobrancas);

export default router