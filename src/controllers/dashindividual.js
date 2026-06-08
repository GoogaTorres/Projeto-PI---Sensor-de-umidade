var dashindividualModel = require("../models/dashindividual");

function buscardados(req, res) {

    const limite_linhas = 7;

    var idSensor = req.body.idSensor;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas para o sensor ${idSensor}`);

    dashindividualModel.buscardados(idSensor, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    buscardados


}