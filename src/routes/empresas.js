let express = require("express");
let roteador = express.Router();

let controladorEmpresa = require("../controllers/empresaController");

// Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
roteador.post("/cadastrar", function (requisicao, resposta) {
    controladorEmpresa.cadastrar(requisicao, resposta);
});

roteador.get("/buscar", function (requisicao, resposta) {
    controladorEmpresa.buscarPorCnpj(requisicao, resposta);
});

roteador.get("/buscar/:id", function (requisicao, resposta) {
  controladorEmpresa.buscarPorId(requisicao, resposta);
});

roteador.get("/listar", function (requisicao, resposta) {
  controladorEmpresa.listar(requisicao, resposta);
});

module.exports = roteador;