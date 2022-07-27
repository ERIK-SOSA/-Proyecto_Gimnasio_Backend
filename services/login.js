const MongoLib = require('../lib/mongo');
const jwt = require('jsonwebtoken');

class LoginService {

    constructor() {
        this.collection = 'Empleados';
        this.mongoDB = new MongoLib();
    }

    async verifyMora(date){
        let todayYear = parseInt(date.slice(0,4));
        let todayMonth = parseInt(date.slice(5,7));
        let todayDay = parseInt(date.slice(8,10));

        const clientes = await this.mongoDB.getClientesNoMorosos('Clientes');
        
        clientes.forEach(function callback(element) {
            let year = parseInt(element.fechaPago.slice(0,4));
            let month = parseInt(element.fechaPago.slice(5,7));
            let day = parseInt(element.fechaPago.slice(8,10));
            
            if (todayYear <= year) {
                if (todayMonth == month) {
                    if (todayDay - day >= 5) {
                        new MongoLib().updateMoroso('Clientes', element._id);
                    }
                } else if (todayMonth > month) {
                    if ((todayDay + 30) - day >= 5 ) {
                        new MongoLib().updateMoroso('Clientes', element._id);
                    }
                }
            } else {
                if (todayMonth == 1) {
                    if ((todayDay + 30) - day >= 5 ) {
                        new MongoLib().updateMoroso('Clientes', element._id);
                    }
                } else {
                    new MongoLib().updateMoroso('Clientes', element._id);
                }
            }
        });
    }

    async verifyCredentials(data) {
        let result = {};
        var correctPassword = true;
        
        const verify = await this.mongoDB.getEmail(this.collection, data.email);

        if ( verify != null ) {

            try {
                var decoded = jwt.verify(verify.password, data.password);
            } catch(err) {
                correctPassword = false;
            }

            if (correctPassword) {
                result = {message: "Welcome " + verify.nombreCompleto + "!!!", rol: verify.puesto_rol};
            } else {
                result = {message: "Contraseña Incorrecta", rol: null};
            }

        } else {
            result = {message: "Email no asociado", rol:null};
        }
        return result;
    }
}

module.exports = LoginService;