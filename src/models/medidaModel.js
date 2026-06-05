let bancoDados = require("../database/config");

function buscarUltimasMedidas(idAquario, limiteLinhas) {

    let instrucaoSql = "SELECT dht11_temperatura as temperatura, dht11_umidade as umidade, momento, DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico FROM medida WHERE fk_aquario = " + idAquario + " ORDER BY id DESC LIMIT " + limiteLinhas;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return bancoDados.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {

    let instrucaoSql = "SELECT dht11_temperatura as temperatura, dht11_umidade as umidade, DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, fk_aquario FROM medida WHERE fk_aquario = " + idAquario + " ORDER BY id DESC LIMIT 1";

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return bancoDados.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas: buscarUltimasMedidas,
    buscarMedidasEmTempoReal: buscarMedidasEmTempoReal
};
