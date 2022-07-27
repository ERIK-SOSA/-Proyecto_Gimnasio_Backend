const MongoLib = require('../lib/mongo');

class RegistroService {

    constructor() {
        this.collection = 'Empleados';
        this.collection1 = 'Sucursales'
        this.mongoDB = new MongoLib();
    }

    async createRegistro(data) {
        const registroCreated = await this.mongoDB.create(this.collection, data);
        const updateEmpleadosSucursalMas = await this.mongoDB.updateCantEmpleadosMas(this.collection1, data.noSucursal);
        return registroCreated;
    }

    async getRegistro() {
        const registro = await this.mongoDB.getTodos(this.collection);
        return registro || {};
    }
    async updateRegistro(data) {
        const registroUpdated = await this.mongoDB.updateEmpleado(this.collection, data.id, data);
        return registroUpdated || {};
    }

    async deleteRegistro(data) {
        const registroDeleted = await this.mongoDB.deleteEmpleado(this.collection, data.data);
        const updateEmpleadosSucursalMenos = await this.mongoDB.updateCantEmpleadosMenos(this.collection1, data.data.noSucursal);
        return registroDeleted || {};
    }


}

module.exports = RegistroService;