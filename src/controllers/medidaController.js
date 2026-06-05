let modeloMedida = require("../models/medidaModel");

function buscarUltimasMedidas(requisicao, resposta) {

    let limiteLinhas = 7;
    let idAquario = requisicao.params.idAquario;

    console.log("Recuperando as ultimas " + limiteLinhas + " medidas");

    modeloMedida.buscarUltimasMedidas(idAquario, limiteLinhas).then(function (resultado) {
        if (resultado.length > 0) {
            resposta.status(200).json(resultado);
        } else {
            resposta.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        resposta.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(requisicao, resposta) {

    let idAquario = requisicao.params.idAquario;

    console.log("Recuperando medidas em tempo real");

    modeloMedida.buscarMedidasEmTempoReal(idAquario).then(function (resultado) {
        if (resultado.length > 0) {
            resposta.status(200).json(resultado);
        } else {
            resposta.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        resposta.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasMedidas: buscarUltimasMedidas,
    buscarMedidasEmTempoReal: buscarMedidasEmTempoReal
};