const express = require('express');
const ObjetivoService = require('../services/objetivos');

function objetivoAPI(app) {
    const router = express.Router();
    app.use("/objetivos", router);
    const objetivoService = new ObjetivoService();

    router.put("/", async function(req, res, next){
        const data = req.body;
        console.log('data', data)
        try {
                const objetivoCreated = await objetivoService.createObjetivo(data);
                res.status(200).json({
                    data: objetivoCreated,
                    message: 'Dieta creada '
                });
          
        } catch (error) {
            next(error);
        }
    });


    router.get("/", async function(req, res, next){
        const { body: id } = req;

        try {
            const objetivo = await objetivoService.getObjetivo(id.id);
            res.status(200).json({
                dieta: objetivo,
                message: 'Busqueda exitosa'
            });
        } catch (error) {
            console.log('Dieta no existente')
            next(error);
        }
    });

    

    router.post("/", async function(req, res, next){
        const { query: number } = req;
        console.log("query",number);
        const isValid = await isValidNumberCreditCard(number.number);
        try {
            if (isValid) {
                const objetivoUpdate = await objetivoService.updateObjetivo(number);
                res.status(200).json({
                    data: objetivoUpdate,
                    message: 'luhn succesfully updated'
                });
            } else {
                res.status(200).json({
                    message: 'the credit card is invalid'
                });
            }
        } catch (error) {
            next(error);
        }
    });

    router.delete("/", async function(req, res, next){
        const { query: id } = req;
        try {
            const objetivoDelete = await objetivoService.deleteObjetivo(id.id);
            res.status(200).json({
                objetivo: objetivoDelete,
                message: 'luhn succesfully deleted'
            });
        } catch (error) {
            next(error);
        }
    });

}

module.exports = objetivoAPI;