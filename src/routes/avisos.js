let express = require("express");
let roteador = express.Router();

let controladorAviso = require("../controllers/avisoController");

roteador.get("/listar", function (requisicao, resposta) {
    controladorAviso.listar(requisicao, resposta);
});

roteador.get("/listar/:idUsuario", function (requisicao, resposta) {
    controladorAviso.listarPorUsuario(requisicao, resposta);
});

roteador.get("/pesquisar/:descricao", function (requisicao, resposta) {
    controladorAviso.pesquisarDescricao(requisicao, resposta);
});

roteador.post("/publicar/:idUsuario", function (requisicao, resposta) {
    controladorAviso.publicar(requisicao, resposta);
});

roteador.put("/editar/:idAviso", function (requisicao, resposta) {
    controladorAviso.editar(requisicao, resposta);
});

roteador.delete("/deletar/:idAviso", function (requisicao, resposta) {
    controladorAviso.deletar(requisicao, resposta);
});

module.exports = roteador;