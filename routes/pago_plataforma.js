const express = require('express');
const PagoPlataformaService = require('../services/pago_plataforma');


function pagoPlataformaAPI(app) {
    const router = express.Router();
    app.use("/pago_plataforma", router);
    const pagoPlataformaService = new PagoPlataformaService();

    router.put("/", async function(req, res, next){
        const { query: data } = req;

        try {
            const realizarPago = await pagoPlataformaService.realizarPago(data.email);
            res.status(200).json({
                result: 'success'
            });

        } catch(err) {
            res.status(200).json({
                result: 'failed'
            });
            next(err);
        }
    });

}

module.exports = pagoPlataformaAPI;