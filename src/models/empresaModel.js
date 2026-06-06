let bancoDados = require("../database/config");

function buscarPorId(id) {
  let instrucaoSql = "SELECT * FROM empresa WHERE idEmpresa = '" + id + "'";

  return bancoDados.executar(instrucaoSql);
}

function listar() {
  let instrucaoSql = "SELECT idEmpresa, nome, cnpj, codigoAtivacao FROM empresa";

  return bancoDados.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  let instrucaoSql = "SELECT * FROM empresa WHERE cnpj = '" + cnpj + "'";

  return bancoDados.executar(instrucaoSql);
}

function cadastrar(nome, cnpj) {
  let instrucaoSql = "INSERT INTO empresa (nome, cnpj) VALUES ('" + nome + "', '" + cnpj + "')";

  return bancoDados.executar(instrucaoSql);
}

function buscarPorCodigoAtivacao(codigo) {
  let instrucaoSql = "SELECT idEmpresa, nome, cnpj, codigoAtivacao FROM empresa WHERE codigoAtivacao = '" + codigo + "'";

  return bancoDados.executar(instrucaoSql);
}

module.exports = {
  buscarPorCnpj: buscarPorCnpj,
  buscarPorId: buscarPorId,
  cadastrar: cadastrar,
  buscarPorCodigoAtivacao: buscarPorCodigoAtivacao,
  listar: listar
};
