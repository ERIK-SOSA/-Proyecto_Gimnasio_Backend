const MongoLib = require('../lib/mongo');

class VerifyEmailService {

    constructor() {
        this.collection = 'Clientes';
        this.mongoDB = new MongoLib();
    }

    async getEmail(email) {
        const Email = await this.mongoDB.getEmail(this.collection, email);
        return Email;
    }

}

module.exports = VerifyEmailService;