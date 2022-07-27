const MongoLib = require('../lib/mongo');

class DietasService {

    constructor() {
        this.collection = 'Dietas';
        this.mongoDB = new MongoLib();
    }

    async createDieta(data) {
        console.log(data)
        const dietaCreated = await this.mongoDB.create(this.collection, data);
        return dietaCreated;
    }

    async getDieta(n) {
        const dieta = await this.mongoDB.get(this.collection, n);
        return dieta || {};
    }

    async updateDieta(data) {
        const dietaUpdated = await this.mongoDB.update(this.collection, data);
        return dietaUpdated || {};
    }

    async deleteDieta(_id) {
        const dietaDeleted = await this.mongoDB.delete(this.collection, _id);
        return dietaDeleted || {};
    }

    async getTodos() {
        const dieta = await this.mongoDB.getTodos(this.collection);
        return dieta || {};
    }
}

module.exports = DietasService;