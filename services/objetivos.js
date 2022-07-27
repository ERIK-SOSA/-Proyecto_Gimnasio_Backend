const MongoLib = require('../lib/mongo');

class ObjetivoService {

    constructor() {
        this.collection = 'Objetivos';
        this.mongoDB = new MongoLib();
    }

    async createObjetivo(data) {
        const objetivoCreated = await this.mongoDB.create(this.collection, data);
        return objetivoCreated;
    }

    async getObjetivo(n) {
        const objetivo = await this.mongoDB.get(this.collection, n);
        return objetivo || false;
    }

    async updateObjetivo(data) {
        const objetivoUpdated = await this.mongoDB.updateLuhn(this.collection, );
        return objetivoUpdated || false;
    }

    async deleteObjetivo(id) {
        const objetivoDeleted = await this.mongoDB.delete(this.collection, id);
        return objetivoDeleted || false;
    }

}

module.exports = ObjetivoService;