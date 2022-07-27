const MongoLib = require('../lib/mongo');

class RutinaService {

    constructor() {
        this.collection = 'Rutinas';
        this.mongoDB = new MongoLib();
    }

    async getRutina(n) {
        const rutina = await this.mongoDB.getRutin(this.collection, n);
        return rutina || {};
    }

    async getRutinas() {
        const rutinas = await this.mongoDB.getTodos(this.collection);
        return rutinas || {};
    }

    async createRutina(data) {
        const rutinaCreated = await this.mongoDB.create(this.collection, data);
        return rutinaCreated;
    }

    async updateRutina(data) {
        const rutinaUpdated = await this.mongoDB.updateRutina(this.collection, data.id, data);
        return rutinaUpdated || {};
    }

    async deleteRutina(id) {
        const rutinaDeleted = await this.mongoDB.delete(this.collection, id);
        return rutinaDeleted || {};
    }

}

module.exports = RutinaService;