var dashModel = require("../models/dashModel");


function carregarDash(req, res) {
  var id = req.body.idServer;

  if (
    id == undefined
  ) {
    res.status(400).json({ mensagem: "Dados incompletos" });
    return;
  }

  dashModel.carregarDash(id)
    .then(function (resultado) {
      if (resultado.length > 0) {

        dashModel.carregarDash(id)
          .then(function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length > 0) {                        
                        res.json(resultado);                        
                    }else {
                        let dadosFormatados = []  
                        res.json(dadosFormatados);
                    }
    
            }
          )
          .catch(function (erro) {
            console.log("Erro ao puxar dados para a dash:", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage || erro);
          });
      } else {
        res.status(404).json({ mensagem: "Dados não encontrados." });
      }
    })
    .catch(function (erro) {
      console.log("Erro ao buscar dados:", erro.sqlMessage || erro);
      res.status(500).json(erro.sqlMessage || erro);
    });
}

module.exports = {
  carregarDash
};