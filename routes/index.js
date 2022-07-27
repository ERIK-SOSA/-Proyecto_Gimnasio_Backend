const watcher = require('../lib/watcher.js')
const webSocketAPI = require('./websocket.js')
const luhnAPI = require('./luhn.js')
const registroEmpleadosAPI = require('./registro_empleados.js')
const registroClientesAPI = require('./registro_clientes.js')
const loginAPI = require('./login.js')
const dietaAPI = require('./dietas.js')
const SucursalAPI = require('./Sucursal.js')
const rutinaAPI = require('./rutina.js')
const verifyEmailAPI = require('./verifyEmail.js')
const pagoPlataformaAPI = require('./pago_plataforma.js')

function  controllers(app) {
    watcher;
    webSocketAPI(app);
    luhnAPI(app);
    registroEmpleadosAPI(app);
    registroClientesAPI(app);
    loginAPI(app);
    dietaAPI(app);
    SucursalAPI(app);
    rutinaAPI(app);
    verifyEmailAPI(app);
    pagoPlataformaAPI(app);
}

module.exports = controllers;