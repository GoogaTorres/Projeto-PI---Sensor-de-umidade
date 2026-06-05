// let ambienteProcesso = 'producao';
let ambienteProcesso = 'desenvolvimento';

let caminhoEnv =
    ambienteProcesso === 'producao'
        ? '.env'
        : '.env.dev';

require("dotenv").config({ path: caminhoEnv });

let express = require("express");
let cors = require("cors");
let path = require("path");

let PORTA_APP = process.env.APP_PORT;
let HOST_APP = process.env.APP_HOST;

let aplicativo = express();

let roteadorIndex = require("./src/routes/index");
let roteadorUsuario = require("./src/routes/usuarios");
let roteadorAvisos = require("./src/routes/avisos");
let roteadorMedidas = require("./src/routes/medidas");
let roteadorAquarios = require("./src/routes/aquarios");
let roteadorEmpresas = require("./src/routes/empresas");

aplicativo.use(cors());

aplicativo.use(express.json());

aplicativo.use(express.urlencoded({ extended: false }));

aplicativo.use(
    express.static(
        path.join(__dirname, "Site institucional")
    )
);

aplicativo.use("/", roteadorIndex);

aplicativo.use("/usuarios", roteadorUsuario);

aplicativo.use("/avisos", roteadorAvisos);

aplicativo.use("/medidas", roteadorMedidas);

aplicativo.use("/aquarios", roteadorAquarios);

aplicativo.use("/empresas", roteadorEmpresas);

aplicativo.listen(PORTA_APP, function () {

    console.log("\n    ===========================================\n    \n    SERVIDOR RODANDO\n    \n    http://" + HOST_APP + ":" + PORTA_APP + "\n    \n    ===========================================\n");

});