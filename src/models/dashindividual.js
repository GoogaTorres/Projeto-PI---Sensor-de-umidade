var database = require("../database/config");

function buscardados(idSensor, limite_linhas) {

    var instrucaoSql = `SELECT 
        r.idDados,
        r.umidade,
        r.dthora,
        DATE_FORMAT(r.dthora, '%H:%i:%s') as momento_grafico
    FROM registroDados r
    WHERE r.fkSensor = ${idSensor}
    ORDER BY r.dthora DESC
    LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    buscardados
}
