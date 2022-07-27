const express = require('express');
const SucursalService = require('../services/Sucursal');




function SucursalAPI(app) {
    const router = express.Router();
    app.use("/sucursal", router);
    const sucursalService = new SucursalService();

    router.put("/", async function(req, res, next){
        const { body: data } = req;
        const noSucursal = data.noSucursal;
        const direccion = data.direccion;
        const cantidadClientes = data.cantidadClientes;
        const cantidadEmpleados = data.cantidadEmpleados;
        const SucursalLista = {noSucursal,direccion,cantidadClientes,cantidadEmpleados};
        try {
            const sucursalCreated = await sucursalService.createSucursal(SucursalLista);
            res.status(200).json({
                data: sucursalCreated,
                message: 'Sucursal succesfully created'
            });

        } catch(err) {
            res.status(200).json({
                message: 'Sucursal not created'
            });
            next(err);
        }
    });

    router.post("/", async function(req, res, next){
        const { body: data } = req;
        console.log('data:',data);

        try {
            const sucursalUpdated = await sucursalService.updateSucursal(data);
            res.status(200).json({
                
                data: sucursalUpdated,
                message: 'Sucursal succesfully updated'
            });

        } catch(err) {
            res.status(200).json({
                message: 'Sucursal not updated'
            });
            next(err);
        }
    });

    router.get("/", async function(req, res, next){
        
        try {
            const sucursalesrequested = await sucursalService.getSucursales();
            res.status(200).json({
                data: sucursalesrequested,
                message: 'Sucursal succesfully requested'
            });

        } catch(err) {
            res.status(200).json({
                message: 'Sucursal not exists'
            });
            next(err);
        }
    });

    router.delete("/", async function(req, res, next){
        const { body: data } = req;

        try {
            const sucursalDeleted = await sucursalService.deleteSucursal(data);
            res.status(200).json({
                data: sucursalDeleted,
                message: 'Sucursal succesfully deleted'
            });

        } catch(err) {
            res.status(200).json({
                message: 'Sucursal not deleted'
            });
            next(err);
        }
    });

}


module.exports = SucursalAPI;