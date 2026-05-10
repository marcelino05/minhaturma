import validator from "validator";
//===>LINKWA_MG AUTENTICAÇÃO
export const validarUsuario = (nome, email, senha) => {
    const erros = {};

    // ===== NOME =====
    if (!nome || validator.isEmpty(nome)) {
        erros.nome = "Nome obrigatório";
    } else if (!validator.isLength(nome, { min: 3, max: 60 })) {
        erros.nome = "Nome deve ter entre 3 e 60 caracteres";
    } else if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(nome)) {
        erros.nome = "Nome contém caracteres inválidos";
    }

    // ===== EMAIL =====
    if (!email || validator.isEmpty(email)) {
        erros.email = "Email obrigatório";
    } else if (!validator.isEmail(email)) {
        erros.email = "Email inválido";
    }

    // ===== SENHA =====
    if (!senha || validator.isEmpty(senha)) {
        erros.senha = "Senha obrigatória";
    } else if (!validator.isLength(senha, { min: 6, max: 15 })) {
        erros.senha = "Senha deve ter entre 6 e 15 caracteres";
    } else if (!/[A-Za-z]/.test(senha)) {
        erros.senha = "Senha deve conter pelo menos uma letra";
    } else if (!/[0-9]/.test(senha)) {
        erros.senha = "Senha deve conter pelo menos um número";
    }

    return erros;
};

export const validarLogin = (email, senha) => {
    const erros = {};

    // ===== EMAIL (igual ao cadastro) =====
    if (!email || validator.isEmpty(email)) {
        erros.email = "Email obrigatório";
    } else if (!validator.isEmail(email)) {
        erros.email = "Email inválido";
    }

    // ===== SENHA (igual ao cadastro) =====
    if (!senha || validator.isEmpty(senha)) {
        erros.senha = "Senha obrigatória";
    } else if (!validator.isLength(senha, { min: 6, max: 15 })) {
        erros.senha = "Senha deve ter entre 6 e 15 caracteres";
    } else if (!/[A-Za-z]/.test(senha)) {
        erros.senha = "Senha deve conter pelo menos uma letra";
    } else if (!/[0-9]/.test(senha)) {
        erros.senha = "Senha deve conter pelo menos um número";
    }

    return erros;
};

//================> LINKWA_MG =============>
// ==>  VALIDAÇÃO DE ALUNOS
//================> LINKWA_MG =============>
export const validarAluno = async (data) => {
    const erros = {};

    const nome = data.nome?.trim();
    const classe = Number(data.classe);
    const disciplina = data.disciplina?.trim();

    // ===== NOME =====
    if (!nome || validator.isEmpty(nome)) {
        erros.nome = "Nome obrigatório";
    } else if (!validator.isLength(nome, { min: 3, max: 60 })) {
        erros.nome = "Nome deve ter entre 3 e 60 caracteres";
    } else if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(nome)) {
        erros.nome = "Nome contém caracteres inválidos";
    }

    // ===== CLASSE =====
    if (!data.classe) {
        erros.classe = "Classe obrigatória";
    } else if (isNaN(classe) || classe < 1 || classe > 12) {
        erros.classe = "Classe inválida";
    }

    // ===== DISCIPLINA =====
    // campo opcional
    if (disciplina) {
        if (typeof disciplina !== "string") {
            erros.disciplina = "Disciplina inválida";
        } else if (disciplina.length < 3 || disciplina.length > 50) {
            erros.disciplina = "Disciplina deve ter entre 3 e 50 caracteres";
        } else if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(disciplina)) {
            erros.disciplina = "Disciplina contém caracteres inválidos";
        }
    }

    return erros;
};

//================> LINKWA_MG =============>
// ==>  VALIDAÇÃO DE COBRANÇAS
//================> LINKWA_MG =============>

export const validarCobrancas = (data) => {
    const erros = {};
    const valor = Number(data.valor);
    const mes = Number(data.mes);
    const aluno = data.aluno_id;

    //Validar campo valor
    if (!valor || isNaN(valor) || valor <= 0) erros.valor = "Valor inválido";

    //Validar campo mes
    if (!mes) erros.mes = "Mês obrigatório";
    else if (isNaN(mes)) erros.mes = "Mês inválido";
    else if (mes < 1 || mes > 12) erros.mes = "Mês deve ser 1 a 12";

    //Validar campo mes
if(!aluno) erros.aluno ="Aluno não foi encontrado"

    return erros;
};
