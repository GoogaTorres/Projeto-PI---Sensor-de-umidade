let bancoDados = require("../database/config");

function buscarPorId(id) {
  let instrucaoSql = "SELECT * FROM empresa WHERE id = '" + id + "'";

  return bancoDados.executar(instrucaoSql);
}

function listar() {
  let instrucaoSql = "SELECT id, razao_social, cnpj, codigo_ativacao FROM empresa";

  return bancoDados.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  let instrucaoSql = "SELECT * FROM empresa WHERE cnpj = '" + cnpj + "'";

  return bancoDados.executar(instrucaoSql);
}

function cadastrar(razaoSocial, cnpj) {
  let instrucaoSql = "INSERT INTO empresa (razao_social, cnpj) VALUES ('" + razaoSocial + "', '" + cnpj + "')";

  return bancoDados.executar(instrucaoSql);
}

module.exports = {
  buscarPorCnpj: buscarPorCnpj,
  buscarPorId: buscarPorId,
  cadastrar: cadastrar,
  listar: listar
};
