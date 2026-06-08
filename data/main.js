// importa as bibliotecas necessarias
let serialport = require('serialport');
let express = require('express');
let mysql = require('mysql2');
let fs = require('fs');
let path = require('path');

// Carrega as configurações de ambiente do arquivo .env ou .env.dev do diretório pai
let ambiente = process.env.AMBIENTE_PROCESSO || 'desenvolvimento';
let envFile = ambiente === 'producao' ? '.env' : '.env.dev';
let envPath = path.join(__dirname, '..', envFile);
if (fs.existsSync(envPath)) {
    let envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split(/\r?\n/).forEach(line => {
        let parts = line.split('=');
        if (parts.length >= 2) {
            let key = parts[0].trim();
            let value = parts.slice(1).join('=').trim();
            // remove surrounding quotes
            value = value.replace(/^['"]|['"]$/g, '');
            process.env[key] = value;
        }
    });
}

const clean = (val) => val ? val.trim().replace(/^['"]|['"]$/g, '') : val;

// configuracoes da conexao
let TAXA_TRANSMISSAO_SERIAL = 9600;
let PORTA_SERVIDOR = 3300;

// habilita ou desabilita a insercao de dados no banco de dados
let HABILITAR_OPERACAO_INSERIR = true;

// funcao de simulação quando não houver Arduino conectado (Simula sensores 1 a 5)
function iniciarSimulacao(valoresSensorAnalogico, valoresSensorDigital, poolBancoDados) {
    console.log('Modo de Simulação ativo para TODOS os sensores. Gerando dados de umidade fictícios a cada 5 segundos...');
    setInterval(async () => {
        // Gera valores de umidade coerentes (entre 45% e 85%)
        let valorSensorDigital = Math.floor(Math.random() * (85 - 45 + 1)) + 45;
        let valorSensorAnalogico = Math.floor(Math.random() * (1023 - 400 + 1)) + 400; // valor analógico bruto

        valoresSensorAnalogico.push(valorSensorDigital); // Armazena a umidade digital em porcentagem
        valoresSensorDigital.push(valorSensorDigital);

        console.log(`[Simulação Total] Sensor 1 (Umidade %): ${valorSensorDigital}`);

        if (HABILITAR_OPERACAO_INSERIR) {
            try {
                // Insere dados simulados para os sensores de 1 a 5 para preencher o banco
                for (let fkSensor = 1; fkSensor <= 5; fkSensor++) {
                    let umidadeSimulada = Math.floor(Math.random() * (85 - 45 + 1)) + 45;
                    await poolBancoDados.execute(
                        'INSERT INTO registroDados (umidade, fkSensor) VALUES (?, ?)',
                        [umidadeSimulada, fkSensor]
                    );
                }
                console.log("[Simulação Total] Leituras inseridas no banco para os sensores 1 a 5.");
            } catch (erro) {
                console.error("[Simulação Total] Erro ao inserir dados simulados no banco:", erro.message);
            }
        }
    }, 5000);
}

// funcao de simulação apenas para os sensores secundários (2 a 5)
function iniciarSimulacaoSensoresSecundarios(poolBancoDados) {
    console.log('Iniciando simulação em segundo plano para os sensores 2 a 5...');
    setInterval(async () => {
        if (HABILITAR_OPERACAO_INSERIR) {
            try {
                // Insere dados simulados para os sensores de 2 a 5 no banco
                for (let fkSensor = 2; fkSensor <= 5; fkSensor++) {
                    let umidadeSimulada = Math.floor(Math.random() * (85 - 45 + 1)) + 45;
                    await poolBancoDados.execute(
                        'INSERT INTO registroDados (umidade, fkSensor) VALUES (?, ?)',
                        [umidadeSimulada, fkSensor]
                    );
                }
                console.log("[Simulação Secundária] Leituras inseridas no banco para os sensores 2 a 5.");
            } catch (erro) {
                console.error("[Simulação Secundária] Erro ao inserir dados secundários no banco:", erro.message);
            }
        }
    }, 5000);
}

// funcao para conexao e leitura da porta serial do Arduino
async function iniciarConexaoSerial(valoresSensorAnalogico, valoresSensorDigital) {

    // conexao com o banco de dados MySQL
    let poolBancoDados = mysql.createPool(
        {
            host: clean(process.env.DB_HOST) || '127.0.0.1',
            user: clean(process.env.DB_USER) || 'root',
            password: clean(process.env.DB_PASSWORD) || '',
            database: clean(process.env.DB_DATABASE) || 'SafeSoja',
            port: Number(clean(process.env.DB_PORT)) || 3306
        }
    ).promise();

    // lista as portas seriais disponiveis e procura pelo Arduino
    let portas = [];
    try {
        portas = await serialport.SerialPort.list();
    } catch (e) {
        console.warn('Erro ao listar portas seriais:', e.message);
    }
    
    let portaArduino = portas.find(function (porta) {
        return porta.vendorId == 2341 && porta.productId == 43;
    });
    
    if (!portaArduino) {
        console.warn('AVISO: O arduino real nao foi encontrado. Entrando em modo simulado completo.');
        iniciarSimulacao(valoresSensorAnalogico, valoresSensorDigital, poolBancoDados);
        return;
    }

    // Se encontrou o Arduino real, inicia a simulação em segundo plano apenas para os outros sensores (2 a 5)
    iniciarSimulacaoSensoresSecundarios(poolBancoDados);

    // configura a porta serial com a taxa de transmissao especificada
    let conexaoArduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: TAXA_TRANSMISSAO_SERIAL
        }
    );

    // evento acionado quando a porta serial e aberta
    conexaoArduino.on('open', function () {
        console.log('A leitura REAL do arduino foi iniciada na porta ' + portaArduino.path + ' utilizando taxa de ' + TAXA_TRANSMISSAO_SERIAL);
    });

    // processa os dados recebidos do Arduino (referentes ao sensor 1)
    conexaoArduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async function (dadosBrutos) {
        console.log("Dados recebidos do Arduino Real: " + dadosBrutos);
        let valoresRecebidos = dadosBrutos.split(';');
        let valorSensorDigital = Number(valoresRecebidos[0]);
        let valorSensorAnalogico = Number(valoresRecebidos[1]);

        // armazena os valores reais do sensor 1 nos vetores correspondentes
        valoresSensorAnalogico.push(valorSensorAnalogico);
        valoresSensorDigital.push(valorSensorDigital);

        // insere os dados reais do sensor 1 no banco de dados se habilitado
        if (HABILITAR_OPERACAO_INSERIR) {
            try {
                await poolBancoDados.execute(
                    'INSERT INTO registroDados (umidade, fkSensor) VALUES (?, 1)',
                    [valorSensorDigital]
                );
                console.log("Valor real do Sensor 1 inserido no banco: " + valorSensorDigital + "%");
            } catch (erro) {
                console.error("Erro ao inserir valor real no banco:", erro.message);
            }
        }
    });

    // evento para lidar com erros na comunicacao serial
    conexaoArduino.on('error', function (mensagemErro) {
        console.error('Erro no arduino real (Mensagem: ' + mensagemErro);
    });
}

// funcao para criar e configurar o servidor web Express
function iniciarServidor(valoresSensorAnalogico, valoresSensorDigital) {
    let appExpress = express();

    // configuracoes de CORS
    appExpress.use(function (requisicao, resposta, proximo) {
        resposta.header('Access-Control-Allow-Origin', '*');
        resposta.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        proximo();
    });

    // inicia o servidor na porta especificada
    appExpress.listen(PORTA_SERVIDOR, function () {
        console.log('API executada com sucesso na porta ' + PORTA_SERVIDOR);
    });

    // define os endpoints da API para cada tipo de sensor
    appExpress.get('/sensores/analogico', function (requisicao, resposta) {
        return resposta.json(valoresSensorAnalogico);
    });
    appExpress.get('/sensores/digital', function (requisicao, resposta) {
        return resposta.json(valoresSensorDigital);
    });
}

// funcao principal auto-executavel para iniciar o sistema
(async function () {
    // vetores para armazenar os valores dos sensores em memoria
    let valoresSensorAnalogico = [];
    let valoresSensorDigital = [];

    // inicia a comunicacao serial
    await iniciarConexaoSerial(valoresSensorAnalogico, valoresSensorDigital);

    // inicia o servidor web
    iniciarServidor(valoresSensorAnalogico, valoresSensorDigital);
})();