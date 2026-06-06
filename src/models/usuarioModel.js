let bancoDados = require("../database/config");

function cadastrar(nome, email, cpf, celular, senha, empresa) {

    let instrucaoSql = `
    INSERT INTO usuario (nome, email, senha, cpf, celular, fkEmpresa) VALUES ('${nome}', '${email}', '${senha}', '${cpf}', '${celular}', ${empresa});`;

    console.log(instrucaoSql);

    return bancoDados.executar(instrucaoSql);
}

function autenticar(email, senha, empresa) {

    let instrucaoSql = `SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}' AND fkEmpresa = ${empresa};`;

    console.log(instrucaoSql);

    return bancoDados.executar(instrucaoSql);
}

module.exports = {
    autenticar: autenticar,
    cadastrar: cadastrar
};