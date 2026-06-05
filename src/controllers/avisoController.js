let modeloAviso = require("../models/avisoModel");

function listar(requisicao, resposta) {
    modeloAviso.listar().then(function (resultado) {
        if (resultado.length > 0) {
            resposta.status(200).json(resultado);
        } else {
            resposta.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        resposta.status(500).json(erro.sqlMessage);
    });
}

function listarPorUsuario(requisicao, resposta) {
    let idUsuario = requisicao.params.idUsuario;

    modeloAviso.listarPorUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    resposta.status(200).json(resultado);
                } else {
                    resposta.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                resposta.status(500).json(erro.sqlMessage);
            }
        );
}

function pesquisarDescricao(requisicao, resposta) {
    let descricao = requisicao.params.descricao;

    modeloAviso.pesquisarDescricao(descricao)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    resposta.status(200).json(resultado);
                } else {
                    resposta.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
                resposta.status(500).json(erro.sqlMessage);
            }
        );
}

function publicar(requisicao, resposta) {
    let titulo = requisicao.body.titulo;
    let descricao = requisicao.body.descricao;
    let idUsuario = requisicao.params.idUsuario;

    if (titulo == undefined) {
        resposta.status(400).send("O título está indefinido!");
    } else if (descricao == undefined) {
        resposta.status(400).send("A descrição está indefinido!");
    } else if (idUsuario == undefined) {
        resposta.status(403).send("O id do usuário está indefinido!");
    } else {
        modeloAviso.publicar(titulo, descricao, idUsuario)
            .then(
                function (resultado) {
                    resposta.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    resposta.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function editar(requisicao, resposta) {
    let novaDescricao = requisicao.body.descricao;
    let idAviso = requisicao.params.idAviso;

    modeloAviso.editar(novaDescricao, idAviso)
        .then(
            function (resultado) {
                resposta.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                resposta.status(500).json(erro.sqlMessage);
            }
        );

}

function deletar(requisicao, resposta) {
    let idAviso = requisicao.params.idAviso;

    modeloAviso.deletar(idAviso)
        .then(
            function (resultado) {
                resposta.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                resposta.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listar: listar,
    listarPorUsuario: listarPorUsuario,
    pesquisarDescricao: pesquisarDescricao,
    publicar: publicar,
    editar: editar,
    deletar: deletar
};