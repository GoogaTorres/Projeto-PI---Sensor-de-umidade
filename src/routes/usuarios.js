let express = require("express");
let roteador = express.Router();

let controladorUsuario = require("../controllers/usuarioController");

roteador.post("/cadastrar", function (requisicao, resposta) {
    controladorUsuario.cadastrar(requisicao, resposta);
});

roteador.post("/autenticar", function (requisicao, resposta) {
    controladorUsuario.autenticar(requisicao, resposta);
});

module.exports = roteador;