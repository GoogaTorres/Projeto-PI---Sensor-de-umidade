let express = require("express");
let roteador = express.Router();

let controladorMedida = require("../controllers/medidaController");

roteador.get("/ultimas/:idAquario", function (requisicao, resposta) {
    controladorMedida.buscarUltimasMedidas(requisicao, resposta);
});

roteador.get("/tempo-real/:idAquario", function (requisicao, resposta) {
    controladorMedida.buscarMedidasEmTempoReal(requisicao, resposta);
});

module.exports = roteador;