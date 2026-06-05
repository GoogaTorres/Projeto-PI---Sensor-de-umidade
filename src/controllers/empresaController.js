let modeloEmpresa = require("../models/empresaModel");

function buscarPorCnpj(requisicao, resposta) {
  let cnpj = requisicao.query.cnpj;

  modeloEmpresa.buscarPorCnpj(cnpj).then(function (resultado) {
    resposta.status(200).json(resultado);
  });
}

function listar(requisicao, resposta) {
  modeloEmpresa.listar().then(function (resultado) {
    resposta.status(200).json(resultado);
  });
}

function buscarPorId(requisicao, resposta) {
  let id = requisicao.params.id;

  modeloEmpresa.buscarPorId(id).then(function (resultado) {
    resposta.status(200).json(resultado);
  });
}

function cadastrar(requisicao, resposta) {
  let cnpj = requisicao.body.cnpj;
  let razaoSocial = requisicao.body.razaoSocial;

  modeloEmpresa.buscarPorCnpj(cnpj).then(function (resultado) {
    if (resultado.length > 0) {
      resposta
        .status(401)
        .json({ mensagem: "a empresa com o cnpj " + cnpj + " já existe" });
    } else {
      modeloEmpresa.cadastrar(razaoSocial, cnpj).then(function (resultado) {
        resposta.status(201).json(resultado);
      });
    }
  });
}

module.exports = {
  buscarPorCnpj: buscarPorCnpj,
  buscarPorId: buscarPorId,
  cadastrar: cadastrar,
  listar: listar
};
