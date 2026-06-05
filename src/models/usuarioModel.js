var database = require("../database/config");

function cadastrar(nome, email, senha, cpf, celular, fkEmpresa) {
  var instrucaoSql = `
        INSERT INTO usuario
        (nome, email, senha, cpf, celular, fkEmpresa)
        VALUES
        ('${nome}', '${email}', '${senha}',
        '${cpf}', '${celular}', ${fkEmpresa});
    `;

  console.log(instrucaoSql);
  return database.executar(instrucaoSql);
}

function autenticar(email, senha, fkEmpresa) {
  var instrucaoSql = `
        SELECT idUsuario, nome, email, cpf, celular, fkEmpresa
        FROM usuario
        WHERE email = '${email}'
        AND senha = '${senha}'
        AND fkEmpresa = ${fkEmpresa};
    `;

  console.log(instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  autenticar,
  cadastrar,
};