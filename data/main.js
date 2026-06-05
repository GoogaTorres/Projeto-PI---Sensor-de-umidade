// importa as bibliotecas necessarias
let serialport = require('serialport');
let express = require('express');
let mysql = require('mysql2');

// configuracoes da conexao
let TAXA_TRANSMISSAO_SERIAL = 9600;
let PORTA_SERVIDOR = 3300;

// habilita ou desabilita a insercao de dados no banco de dados
let HABILITAR_OPERACAO_INSERIR = true;

// funcao para conexao e leitura da porta serial do Arduino
async function iniciarConexaoSerial(valoresSensorAnalogico, valoresSensorDigital) {

    // conexao com o banco de dados MySQL
    let poolBancoDados = mysql.createPool(
        {
            host: '127.0.0.1',
            user: 'cliente',
            password: 'Sptech#2024',
            database: 'SafeSoja',
            port: 3307
        }
    ).promise();

    // lista as portas seriais disponiveis e procura pelo Arduino
    let portas = await serialport.SerialPort.list();
    let portaArduino = portas.find(function (porta) {
        return porta.vendorId == 2341 && porta.productId == 43;
    });
    if (!portaArduino) {
        throw new Error('O arduino nao foi encontrado em nenhuma porta serial');
    }

    // configura a porta serial com a taxa de transmissao especificada
    let conexaoArduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: TAXA_TRANSMISSAO_SERIAL
        }
    );

    // evento acionado quando a porta serial e aberta
    conexaoArduino.on('open', function () {
        console.log('A leitura do arduino foi iniciada na porta ' + portaArduino.path + ' utilizando taxa de ' + TAXA_TRANSMISSAO_SERIAL);
    });

    // processa os dados recebidos do Arduino
    conexaoArduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async function (dadosBrutos) {
        console.log(dadosBrutos);
        let valoresRecebidos = dadosBrutos.split(';');
        let valorSensorDigital = Number(valoresRecebidos[0]);
        let valorSensorAnalogico = Number(valoresRecebidos[1]);

        // armazena os valores dos sensores nos vetores correspondentes
        valoresSensorAnalogico.push(valorSensorAnalogico);
        valoresSensorDigital.push(valorSensorDigital);

        // insere os dados no banco de dados se habilitado
        if (HABILITAR_OPERACAO_INSERIR) {
            await poolBancoDados.execute(
                'INSERT INTO registroDados (umidade, fkSensor) VALUES (?, 1)',
                [valorSensorDigital]
            );
            console.log("valores inseridos no banco: " + valorSensorDigital);
        }
    });

    // evento para lidar com erros na comunicacao serial
    conexaoArduino.on('error', function (mensagemErro) {
        console.error('Erro no arduino (Mensagem: ' + mensagemErro);
    });
}

// funcao para criar e configurar o servidor web Express
function iniciarServidor(valoresSensorAnalogico, valoresSensorDigital) {
    let aplicativoExpress = express();

    // configuracoes de CORS
    aplicativoExpress.use(function (requisicao, resposta, proximo) {
        resposta.header('Access-Control-Allow-Origin', '*');
        resposta.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        proximo();
    });

    // inicia o servidor na porta especificada
    aplicativoExpress.listen(PORTA_SERVIDOR, function () {
        console.log('API executada com sucesso na porta ' + PORTA_SERVIDOR);
    });

    // define os endpoints da API para cada tipo de sensor
    aplicativoExpress.get('/sensores/analogico', function (requisicao, resposta) {
        return resposta.json(valoresSensorAnalogico);
    });
    aplicativoExpress.get('/sensores/digital', function (requisicao, resposta) {
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