const MongoLib = require('../lib/mongo');

class PagoPlataformaService {

    constructor() {
        this.collection = 'Clientes';
        this.mongoDB = new MongoLib();
        this.todayMonth = new Date().getMonth() + 1;
        this.todayYear = new Date().getFullYear();
    }

    async realizarPago(email) {
        const data = await this.mongoDB.getEmail(this.collection, email);

        let cantUltimoPago = data.montoMora + data.mensualidad;

        let year = parseInt(data.fechaPago.slice(0,4));
        let month = parseInt(data.fechaPago.slice(5,7));
        let day = parseInt(data.fechaPago.slice(8,10));

        if (year < this.todayYear) { year = this.todayYear; };
        if (month < this.todayMonth) { month = this.todayMonth; };
        if (month == 12) { year += 1; month = 1; } else { month += 1; };
        if (month < 10) { month = '0' + month.toString() };
        if (day < 10) { day = '0' + day.toString() };
        const newFechaPago = year.toString() + '-' + month + '-' + day;

        const realizarPago = await this.mongoDB.realizarPago(this.collection, email, newFechaPago, cantUltimoPago);
        return realizarPago;
    }

}

module.exports = PagoPlataformaService;