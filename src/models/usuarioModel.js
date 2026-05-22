var database = require("../database/config");

function cadastrar(nome, email, cpf, celular, senha, empresa) {

    var instrucaoSql = `
    
        INSERT INTO usuario
        (nome, email, senha, cpf, celular, fkEmpresa)
        VALUES
        ('${nome}', '${email}', '${senha}',
        '${cpf}', '${celular}', ${empresa});
    
    `;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}

function autenticar(email, senha) {

    var instrucaoSql = `
    
        SELECT *
        FROM usuario
        WHERE email = '${email}'
        AND senha = '${senha}';
    
    `;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
}