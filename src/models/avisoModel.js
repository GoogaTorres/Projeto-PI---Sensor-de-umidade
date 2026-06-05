let bancoDados = require("../database/config");

function listar() {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    let instrucaoSql = "SELECT a.id AS idAviso, a.titulo, a.descricao, a.fk_usuario, u.id AS idUsuario, u.nome, u.email, u.senha FROM aviso a INNER JOIN usuario u ON a.fk_usuario = u.id;";
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return bancoDados.executar(instrucaoSql);
}

function pesquisarDescricao(texto) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");
    let instrucaoSql = "SELECT a.id AS idAviso, a.titulo, a.descricao, a.fk_usuario, u.id AS idUsuario, u.nome, u.email, u.senha FROM aviso a INNER JOIN usuario u ON a.fk_usuario = u.id WHERE a.descricao LIKE '" + texto + "';";
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return bancoDados.executar(instrucaoSql);
}

function listarPorUsuario(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    let instrucaoSql = "SELECT a.id AS idAviso, a.titulo, a.descricao, a.fk_usuario, u.id AS idUsuario, u.nome, u.email, u.senha FROM aviso a INNER JOIN usuario u ON a.fk_usuario = u.id WHERE u.id = " + idUsuario + ";";
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return bancoDados.executar(instrucaoSql);
}

function publicar(titulo, descricao, idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", titulo, descricao, idUsuario);
    let instrucaoSql = "INSERT INTO aviso (titulo, descricao, fk_usuario) VALUES ('" + titulo + "', '" + descricao + "', " + idUsuario + ");";
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return bancoDados.executar(instrucaoSql);
}

function editar(novaDescricao, idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novaDescricao, idAviso);
    let instrucaoSql = "UPDATE aviso SET descricao = '" + novaDescricao + "' WHERE id = " + idAviso + ";";
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return bancoDados.executar(instrucaoSql);
}

function deletar(idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
    let instrucaoSql = "DELETE FROM aviso WHERE id = " + idAviso + ";";
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return bancoDados.executar(instrucaoSql);
}

module.exports = {
    listar: listar,
    listarPorUsuario: listarPorUsuario,
    pesquisarDescricao: pesquisarDescricao,
    publicar: publicar,
    editar: editar,
    deletar: deletar
};
