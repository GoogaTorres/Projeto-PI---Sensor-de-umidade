var usuarioModel = require("../models/usuarioModel");
var empresaModel = require("../models/empresaModel");

function cadastrar(req, res) {
  var nome = req.body.nomeServer;
  var email = req.body.emailServer;
  var cpf = req.body.cpfServer;
  var celular = req.body.celularServer;
  var senha = req.body.senhaServer;
  var codigoEmpresa = req.body.empresaServer;

  if (
    nome == undefined ||
    email == undefined ||
    cpf == undefined ||
    celular == undefined ||
    senha == undefined ||
    codigoEmpresa == undefined
  ) {
    res.status(400).json({ mensagem: "Dados incompletos para cadastro." });
    return;
  }

  empresaModel
    .buscarPorCodigoAtivacao(codigoEmpresa)
    .then(function (resultado) {
      if (resultado.length > 0) {
        var empresaId = resultado[0].idEmpresa || resultado[0].id;

        usuarioModel
          .cadastrar(nome, email, senha, cpf, celular, empresaId)
          .then(function (resultado) {
            res.status(201).json(resultado);
          })
          .catch(function (erro) {
            console.log("Erro ao cadastrar usuário:", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage || erro);
          });
      } else {
        res.status(404).json({ mensagem: "Empresa não encontrada." });
      }
    })
    .catch(function (erro) {
      console.log("Erro ao buscar empresa:", erro.sqlMessage || erro);
      res.status(500).json(erro.sqlMessage || erro);
    });
}

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  var codigoEmpresa = req.body.empresaServer;

  if (
    email == undefined ||
    senha == undefined ||
    codigoEmpresa == undefined
  ) {
    res.status(400).json({ mensagem: "Dados incompletos para autenticação." });
    return;
  }

  empresaModel
    .buscarPorCodigoAtivacao(codigoEmpresa)
    .then(function (resultado) {
      if (resultado.length > 0) {
        var empresaId = resultado[0].idEmpresa || resultado[0].id;

        usuarioModel
          .autenticar(email, senha, empresaId)
          .then(function (resultado) {
            if (resultado.length > 0) {
              res.status(200).json(resultado[0]);
            } else {
              res
                .status(403)
                .json({ mensagem: "Email, senha ou empresa inválidos." });
            }
          })
          .catch(function (erro) {
            console.log("Erro ao autenticar usuário:", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage || erro);
          });
      } else {
        res.status(404).json({ mensagem: "Empresa não encontrada." });
      }
    })
    .catch(function (erro) {
      console.log("Erro ao buscar empresa:", erro.sqlMessage || erro);
      res.status(500).json(erro.sqlMessage || erro);
    });
}

module.exports = {
  autenticar,
  cadastrar,
};