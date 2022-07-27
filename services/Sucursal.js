const MongoLib = require('../lib/mongo');

class SucursalService {

    constructor() {
        this.collection = 'Sucursales';
        this.mongoDB = new MongoLib();
    }

    async createSucursal(data) {
        const SucursalCreated = await this.mongoDB.create(this.collection, data);
        return SucursalCreated;
    }

    async getSucursales() {
        const sucursal = await this.mongoDB.getTodos(this.collection);
        return sucursal || {};
    }

    async getSucursal(data) {
        const sucursal = await this.mongoDB.getSucursal(this.collection, data)
        return sucursal || {};
    }

    async updateSucursal(data) {
        const sucursalUpdated = await this.mongoDB.updateSucursal(this.collection, data.id, data);
        console.log('sucursal Updated', sucursalUpdated);
        return sucursalUpdated || {};
    }

    async deleteSucursal(id) {
        const sucursalDeleted = await this.mongoDB.delete(this.collection, id);
        console.log('sucursal deleted', sucursalDeleted);
        return sucursalDeleted || {};
    }

}

module.exports =SucursalService;