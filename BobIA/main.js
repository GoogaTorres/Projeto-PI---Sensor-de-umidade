// importando as bibliotecas necessárias
let { GoogleGenAI } = require("@google/genai");
let express = require("express");
let path = require("path");

// carregando as variáveis de ambiente do projeto do arquivo .env
require("dotenv").config();

// configurando o servidor express
let aplicativo = express();
let PORTA_SERVIDOR = process.env.PORTA;

// configurando o gemini (IA)
let chatIA = new GoogleGenAI({ apiKey: process.env.MINHA_CHAVE });

// configurando o servidor para receber requisições JSON
aplicativo.use(express.json());

// configurando o servidor para servir arquivos estáticos
aplicativo.use(express.static(path.join(__dirname, "public")));

// configurando CORS
aplicativo.use(function (requisicao, resposta, proximo) {
    resposta.header('Access-Control-Allow-Origin', '*');
    resposta.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    proximo();
});

// inicializando o servidor
aplicativo.listen(PORTA_SERVIDOR, function () {
    console.info(
        `
        ######                ###    #    
        #     #  ####  #####   #    # #   
        #     # #    # #    #  #   #   #  
        ######  #    # #####   #  #     # 
        #     # #    # #    #  #  ####### 
        #     # #    # #    #  #  #     # 
        ######   ####  #####  ### #     # 
        `
    );
    console.info("A API BobIA iniciada, acesse http://localhost:" + PORTA_SERVIDOR);
});

// rota para receber perguntas e gerar respostas
aplicativo.post("/perguntar", async function (requisicao, resposta) {
    let pergunta = requisicao.body.pergunta;

    try {
        let resultado = await gerarResposta(pergunta);
        resposta.json({ resultado: resultado });
    } catch (erro) {
        resposta.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

// função para gerar respostas usando o gemini
async function gerarResposta(mensagem) {
    try {
        // gerando conteúdo com base na pergunta
        const response = await chatIA.generateContent({
            contents: [{
                parts: [{
                    text: "Em um parágrafo responda: " + mensagem
                }]
            }]
        });
        
        const resposta = response.response.text();
        console.log(resposta);
        console.log("Resposta gerada com sucesso!");

        return resposta;
    } catch (erro) {
        console.error("Erro ao gerar resposta:", erro);
        throw erro;
    }
}

