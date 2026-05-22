var usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {

    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cpf = req.body.cpfServer;
    var celular = req.body.celularServer;
    var senha = req.body.senhaServer;
    var empresa = req.body.empresaServer;

    if (nome == undefined) {
        res.status(400).send("Nome undefined");
    } else if (email == undefined) {
        res.status(400).send("Email undefined");
    } else if (senha == undefined) {
        res.status(400).send("Senha undefined");
    } else {

        usuarioModel.cadastrar(
            nome,
            email,
            cpf,
            celular,
            senha,
            empresa
        )

        .then(function (resultado) {

            res.json(resultado);

        })

        .catch(function (erro) {

            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );

            res.status(500).json(erro.sqlMessage);

        });

    }
}

function autenticar(req, res) {

    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Email undefined");
    } else if (senha == undefined) {
        res.status(400).send("Senha undefined");
    } else {

        usuarioModel.autenticar(email, senha)

        .then(function (resultado) {

            if (resultado.length == 1) {

                res.json(resultado[0]);

            } else if (resultado.length == 0) {

                res.status(403).send("Email e/ou senha inválido(s)");

            } else {

                res.status(403).send("Mais de um usuário");

            }

        })

        .catch(function (erro) {

            console.log(erro);

            res.status(500).json(erro.sqlMessage);

        });

    }
}

module.exports = {
    autenticar,
    cadastrar
}