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

let app = express();

let roteadorIndex = require("./src/routes/index");
let roteadorUsuario = require("./src/routes/usuarios");
let roteadorAvisos = require("./src/routes/avisos");
let roteadorMedidas = require("./src/routes/medidas");
let roteadorAquarios = require("./src/routes/aquarios");
let roteadorEmpresas = require("./src/routes/empresas");
var dashRouter = require("./src/routes/dash");

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(
    express.static(
        path.join(__dirname, "Site institucional")
    )
);

app.use("/", roteadorIndex);

app.use("/usuarios", roteadorUsuario);

app.use("/dash", dashRouter);

app.use("/avisos", roteadorAvisos);

app.use("/medidas", roteadorMedidas);

app.use("/aquarios", roteadorAquarios);

app.use("/empresas", roteadorEmpresas);

app.listen(PORTA_APP, function () {

console.log(`
    
    ===========================================
    
    SERVIDOR RODANDO
    
    http://${HOST_APP}:${PORTA_APP}
    
    ===========================================
    
    `);
});