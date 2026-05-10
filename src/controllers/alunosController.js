import pool from "../database/db.js";
import { validarAluno } from "../utils/validator.js";

export const criarAluno = async (req, res) => {
    const { nome, classe, disciplina } = req.body;
    const usuario_id = req.usuario.id;

    const erros = await validarAluno(req.body);

    if (Object.keys(erros).length > 0) {
        return res.status(400).json({
            success: false,
            message: erros
        });
    }

    try {
        // verificar se usuário existe
        const usuario = await pool.query("SELECT id FROM usuarios WHERE id = $1", [usuario_id]);

        if (usuario.rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Usuário não foi encontrado"
            });
        }

        // criar aluno
        const alunos = await pool.query(
            `INSERT INTO alunos
            (nome, classe, disciplina, usuario_id)
            VALUES($1, $2, $3, $4)
            RETURNING *`,
            [nome, classe, disciplina, usuario_id]
        );

        res.status(201).json({
            success: true,
            data: alunos.rows[0]
        });
    } catch (erro) {
        console.log(erro.message);

        res.status(500).json({
            success: false,
            message: erro.message
        });
    }
};

export const listarAlunos = async (req, res) => {
    const usuario_id = req.usuario.id;

    try {
        const alunos = await pool.query(
            "SELECT * FROM alunos WHERE usuario_id = $1 ORDER BY id ASC",
            [usuario_id]
        );

        res.status(200).json({
            success: true,
            data: alunos.rows
        });
    } catch (erro) {
        res.status(500).json({
            success: false,
            message: erro.message
        });
    }
};