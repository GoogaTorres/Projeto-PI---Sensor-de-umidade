// importando os bibliotecas necessárias
const { GoogleGenAI } = require("@google/genai");
const express = require("express");
const path = require("path");

// carregando as variáveis de ambiente do projeto do arquivo .env ou .env.dev
const fs = require("fs");
let envPath = path.join(__dirname, "../.env");
if (!fs.existsSync(envPath)) {
    envPath = path.join(__dirname, "../.env.dev");
}
require("dotenv").config({ path: envPath });

// configurando o servidor express
const app = express();
const PORTA_SERVIDOR = process.env.PORTA || 3336;

// configurando o gemini (IA)
const chatIA = new GoogleGenAI({ apiKey: process.env.MINHA_CHAVE });

// configurando o servidor para receber requisições JSON
app.use(express.json());

// configurando o servidor para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// configurando CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

// inicializando o servidor
app.listen(PORTA_SERVIDOR, () => {
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
    console.info(`A API BobIA iniciada, acesse http://localhost:${PORTA_SERVIDOR}`);
});

// rota para receber perguntas e gerar respostas
app.post("/perguntar", async (req, res) => {
    const pergunta = req.body.pergunta;

    try {
        const resultado = await gerarResposta(pergunta);
        res.json({ resultado });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }

});

function gerarRespostaSimulada(mensagem) {
    const msgLower = mensagem.toLowerCase();
    
    if (msgLower.includes('umidade') || msgLower.includes('solo') || msgLower.includes('água') || msgLower.includes('irrigar') || msgLower.includes('irrigação')) {
        return "Olá! Sou o BobIA. Para a cultura da soja, a umidade ideal do solo deve ficar entre 55% e 80%. Se estiver abaixo de 50%, há risco de estresse hídrico e você deve irrigar imediatamente. Se estiver acima de 85%, há risco de apodrecimento das raízes.";
    }
    
    if (msgLower.includes('sensor') || msgLower.includes('arduino') || msgLower.includes('inativo') || msgLower.includes('funcionando')) {
        return "Olá! Sou o BobIA. Se algum sensor estiver com o status 'Inativo' (cinza na dashboard), verifique as conexões físicas da fiação e se o Arduino está ligado e enviando dados na porta serial correta.";
    }
    
    return "Olá! Sou o BobIA, o assistente virtual da SafeSoja. Posso te ajudar com dúvidas sobre a umidade do solo do seu plantio de soja, parâmetros ideais e o funcionamento dos sensores. Como posso ajudar você hoje?";
}

// função para gerar respostas usando o gemini
async function gerarResposta(mensagem) {
    const apiKey = process.env.MINHA_CHAVE;
    if (!apiKey || apiKey === 'sua_chave_api_gemini_aqui' || apiKey.trim() === '' || apiKey.includes('sua_chave')) {
        console.log("Aviso: Chave de API do Gemini não configurada ou inválida. Usando resposta simulada.");
        return gerarRespostaSimulada(mensagem);
    }

    try {
        // gerando conteúdo com base na pergunta
        const modeloIA = chatIA.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Em um paragráfo responda: ${mensagem}`
        });
        const resposta = (await modeloIA).text;
        const tokens = (await modeloIA).usageMetadata;

        console.log(resposta);
        console.log("Uso de Tokens:", tokens);

        return resposta;
    } catch (error) {
        console.error("Erro na API do Gemini, usando resposta simulada de fallback:", error);
        return gerarRespostaSimulada(mensagem);
    }
}