const MongoLib = require('../lib/mongo');

class RegistroService {

    constructor() {
        this.collection = 'Clientes';
        this.collection1 = 'Sucursales';
        this.mongoDB = new MongoLib();
    }

    async createRegistro(data) {
        const registroCreated = await this.mongoDB.create(this.collection, data);
        const updateEmpleadosSucursalMas = await this.mongoDB.updateCantClientesMas(this.collection1, data.noSucursal);
        return registroCreated;
    }

    async getClientes() {
        const clientes = await this.mongoDB.getTodos(this.collection);
        return clientes || {};
    }

    async updateCliente(data) {
        const clienteUpdated = await this.mongoDB.updateCliente(this.collection, data.id, data);
        return clienteUpdated || {};
    }

    async deleteCliente(data) {
        const clienteDeleted = await this.mongoDB.deleteCliente(this.collection, data.data);
        const updateEmpleadosSucursalMenos = await this.mongoDB.updateCantClientesMenos(this.collection1, data.data.noSucursal);
        return clienteDeleted || {};
    }

}

module.exports = RegistroService;