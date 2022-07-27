const express = require('express');
const VerifyEmailService = require('../services/verifyEmail');


function verifyEmailAPI(app) {
    const router = express.Router();
    app.use("/verifyEmail", router);
    const verifyEmailService = new VerifyEmailService();

    router.get("/", async function(req, res, next){
        const { query: email } = req;

        try {
            const getVerifiedEmail = await verifyEmailService.getEmail(email.email);
            if (getVerifiedEmail == null) {
                res.status(200).json({                    
                    inDatabase: 'false'
                });
            } else {
                res.status(200).json({
                    mensualidad: getVerifiedEmail.mensualidad,
                    montoMora: getVerifiedEmail.montoMora,
                    inDatabase: 'true'
                });
            }
            

        } catch(err) {
            res.status(200).json({
                inDatabase: 'false'
            });
            next(err);
        }
    });

}

module.exports = verifyEmailAPI;