let express = require("express");
let roteador = express.Router();

roteador.get("/", function (requisicao, resposta) {

    resposta.redirect("/index.html");

});

module.exports = roteador;