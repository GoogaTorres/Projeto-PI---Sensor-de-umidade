var database = require("../database/config");


function carregarDash(id) {
  var instrucaoSql = `
        select h.hectare hectare, s.identificador sensor, s.coordenada, s.condicao from usuario u
	join empresa e on u.fkEmpresa = e.idEmpresa
	join terreno h on h.fkEmpresa = e.idEmpresa
	join sensores s on s.fkHectares = h.idTerreno
where u.idUsuario = ${id};
    `;

  console.log(instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  carregarDash
};
