import express from "express";
import { verificarToken } from "../middleware/auth.js";
import {
    criarUsuario,
    login,
    buscarUsuario
} from "../controllers/usuariosController.js";

const router = express.Router();

router.post("/", criarUsuario);
router.post("/login", login);
router.get("/me", verificarToken, buscarUsuario);

export default router;
