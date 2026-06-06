require('dotenv').config({path:'.env.dev'});
const controlador = require('./src/controllers/usuarioController');
const fakeReq = { body: { nomeServer:'Teste', emailServer:'t@t.com', cpfServer:'57346123085', celularServer:'11999999999', senhaServer:'12345678', empresaServer:'SOJA123' } };
const fakeRes = {
  status(code) { this.code = code; return this; },
  json(obj) { console.log('RES JSON', this.code, obj); },
  end() { console.log('RES END', this.code); }
};
controlador.cadastrar(fakeReq, fakeRes);
