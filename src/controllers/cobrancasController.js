import pool from "../database/db.js";
import { validarCobrancas } from "../utils/validator.js";

export const criarCobrancas = async (req, res) => {
    const { aluno_id, valor, mes } = req.body;

    const erros = validarCobrancas(req.body);
    if (Object.keys(erros).length > 0) return res.status(400).json({ success: false, message: erros });

    try {
        const cobrancas = await pool.query(
            "INSERT INTO cobrancas (aluno_id, valor, mes) VALUES($1, $2, $3) RETURNING *",
            [aluno_id, valor, mes]
        );

        return res.status(200).json({
            success: true,
            message: "Pagamento realizado com sucesso",
            data: cobrancas.rows[0]
        });
    } catch (erro) {
        res.status(500).json({ success: false, message: "Erro ao criar cobranças " + erro.message });
    }
};
