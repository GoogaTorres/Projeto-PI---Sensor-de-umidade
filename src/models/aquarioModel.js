let bancoDados = require("../database/config");

function buscarAquariosPorEmpresa(empresaId) {

  let instrucaoSql = "SELECT * FROM aquario a WHERE fk_empresa = " + empresaId;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return bancoDados.executar(instrucaoSql);
}

function cadastrar(empresaId, descricao) {
  
  let instrucaoSql = "INSERT INTO (descricao, fk_empresa) aquario VALUES (" + descricao + ", " + empresaId + ")";

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return bancoDados.executar(instrucaoSql);
}

module.exports = {
  buscarAquariosPorEmpresa: buscarAquariosPorEmpresa,
  cadastrar: cadastrar
};
