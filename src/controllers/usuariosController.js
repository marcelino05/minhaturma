import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../database/db.js";
import { validarUsuario, validarLogin } from "../utils/validator.js";

export const criarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    const erros = validarUsuario(nome, email, senha);

    if (Object.keys(erros).length > 0) {
        return res.status(400).json({ success: false, message: erros });
    }

    try {
        const senhaHash = await bcrypt.hash(senha, 10);

        const user = await pool.query("INSERT INTO usuarios(nome, email, senha) VALUES($1, $2, $3) RETURNING *", [
            nome,
            email,
            senhaHash
        ]);

        res.status(201).json({
            success: true,
            data: {
                id: user.rows[0].id,
                nome: user.rows[0].nome,
                email: user.rows[0].email
            }
        });
    } catch (erro) {
        res.status(500).json({
            success: false,
            message: "Erro ao criar usuário: " + erro.message
        });
    }
};

export const login = async (req, res) => {
    const { email, senha } = req.body;

    const erros = validarLogin(email, senha);

    if (Object.keys(erros).length > 0) {
        return res.status(400).json({ success: false, message: erros });
    }

    try {
        const data = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);

        const usuario = data.rows[0];

        if (!usuario) {
            return res.status(401).json({
                success: false,
                message: "Usuário não encontrado"
            });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(400).json({
                success: false,
                message: "Senha inválida"
            });
        }

        const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, {
            expiresIn: "12h"
        });

        res.status(200).json({ success: true, token });
    } catch (erro) {
        res.status(500).json({
            success: false,
            message: "Erro no login " + erro.message
        });
    }
};

export const buscarUsuario = async (req, res) => {
    try {
        const usuarioId = req.usuario?.id;

        if (!usuarioId) {
            return res.status(401).json({
                success: false,
                message: "Usuário não autenticado"
            });
        }

        console.log("usuarioId", usuarioId);

        const result = await pool.query("SELECT id, nome, email FROM usuarios WHERE id = $1", [usuarioId]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuário não encontrado"
            });
        }

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);

        res.status(500).json({
            success: false,
            message: "Erro interno do servidor"
        });
    }
};
