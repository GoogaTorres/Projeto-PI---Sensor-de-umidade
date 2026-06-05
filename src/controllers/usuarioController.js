let modeloUsuario = require("../models/usuarioModel");

function cadastrar(requisicao, resposta) {

    let nome = requisicao.body.nomeServer;
    let email = requisicao.body.emailServer;
    let cpf = requisicao.body.cpfServer;
    let celular = requisicao.body.celularServer;
    let senha = requisicao.body.senhaServer;
    let empresa = requisicao.body.empresaServer;

    if (nome == undefined) {
        resposta.status(400).send("Nome undefined");
    } else if (email == undefined) {
        resposta.status(400).send("Email undefined");
    } else if (senha == undefined) {
        resposta.status(400).send("Senha undefined");
    } else {

        modeloUsuario.cadastrar(
            nome,
            email,
            cpf,
            celular,
            senha,
            empresa
        )
        .then(function (resultado) {
            resposta.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            resposta.status(500).json(erro.sqlMessage);
        });

    }
}

function autenticar(requisicao, resposta) {

    let email = requisicao.body.emailServer;
    let senha = requisicao.body.senhaServer;

    if (email == undefined) {
        resposta.status(400).send("Email undefined");
    } else if (senha == undefined) {
        resposta.status(400).send("Senha undefined");
    } else {

        modeloUsuario.autenticar(email, senha)
        .then(function (resultado) {
            if (resultado.length == 1) {
                resposta.json(resultado[0]);
            } else if (resultado.length == 0) {
                resposta.status(403).send("Email e/ou senha inválido(s)");
            } else {
                resposta.status(403).send("Mais de um usuário");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            resposta.status(500).json(erro.sqlMessage);
        });

    }
}

module.exports = {
    autenticar: autenticar,
    cadastrar: cadastrar
};