let express = require("express");
let roteador = express.Router();

let controladorAquario = require("../controllers/aquarioController");

roteador.get("/:empresaId", function (requisicao, resposta) {
  controladorAquario.buscarAquariosPorEmpresa(requisicao, resposta);
});

roteador.post("/cadastrar", function (requisicao, resposta) {
  controladorAquario.cadastrar(requisicao, resposta);
});

module.exports = roteador;