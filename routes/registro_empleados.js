const express = require('express');
const RegistroService = require('../services/registro_empleados');
const jwt = require('jsonwebtoken');


function registroAPI(app) {
    const router = express.Router();
    app.use("/registro_empleados", router);
    const registroService = new RegistroService();

    router.put("/", async function(req, res, next){
        const { body: datos } = req;

        try {
            var securePassword = jwt.sign({ foo: 'bar' }, datos.password);
            const remainingdata = { "password": securePassword };
            const data = Object.assign(datos,remainingdata);
            const registroCreated = await registroService.createRegistro(data);
            res.status(200).json({
                data: registroCreated,
                message: 'data succesfully inserted in Empleados'
            });

        } catch(err) {
            res.status(200).json({
                message: 'the data was not inserted in Empleados'
            });
            next(err);
        }
    });

    router.post("/", async function(req, res, next){
        const { body: data } = req;

        try {
            const registroUpdated = await registroService.updateRegistro(data);
            res.status(200).json({
                data: registroUpdated,
                message: 'empleado succesfully updated'
            });

        } catch(err) {
            res.status(200).json({
                message: 'empleado not updated'
            });
            next(err);
        }
    });
    router.get("/", async function(req, res, next){
        
        try {
            const registrorequested = await registroService.getRegistro();
            res.status(200).json({
                data: registrorequested,
                message: 'Empleado succesfully requested'
            });

        } catch(err) {
            res.status(200).json({
                message: 'Empleado not exists'
            });
            next(err);
        }
    });
    router.delete("/", async function(req, res, next){
        const { body: data } = req;

        try {
            const registroDeleted = await registroService.deleteRegistro(data);
            res.status(200).json({
                data: registroDeleted,
                message: 'empleado succesfully deleted'
            });

        } catch(err) {
            res.status(200).json({
                message: 'empleado not deleted'
            });
            next(err);
        }
    });

}

module.exports = registroAPI;