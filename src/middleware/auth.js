import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({
            success: false,
            message: "Sem token"
        });
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // guardar id do usuário
        req.usuario = decoded;

        next();
    } catch (erro) {
        return res.status(401).json({
            success: false,
            message: "Token inválido"
        });
    }
};
