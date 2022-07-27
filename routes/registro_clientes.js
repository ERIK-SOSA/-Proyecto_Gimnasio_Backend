const express = require('express');
const RegistroService = require('../services/registro_clientes');
const nodemailer = require('nodemailer');



function registroAPI(app) {
    const router = express.Router();
    app.use("/registro_clientes", router);
    const registroService = new RegistroService();

    router.put("/", async function(req, res, next){
        const { body: datos } = req;
        try {
            //Esto es lo que te comentaba de la fechaPago
            let day = new Date().getDate();
            let month = new Date().getMonth() + 1;
            if (month < 10) { month = '0' + month.toString() };
            if (day < 10) { day = '0' + day.toString() };
            const year = new Date().getFullYear();
            const fecha = year.toString() + '-' + month + '-' + day;
            //Acá termina

                                                                                                                           //Agrega lo de fechaPago
            const remainingdata = { "mensualidad": 250, "moroso": "no", "montoMora": 0, "estado": "activo", "cantUltimoPago": 0, "fechaPago": fecha};
            const data = Object.assign(datos,remainingdata);
            const registroCreated = await registroService.createRegistro(data);
            res.status(200).json({
                data: registroCreated,
                message: 'data succesfully inserted in Clientes' 
            });
        } catch(err) {
            res.status(200).json({
                message: 'the data was not inserted in Clientes'
            });
            next(err);
        }
    });
    router.get("/", async function(req, res, next){
        try {
            const clientes = await registroService.getClientes();
            res.status(200).json({
                clientes: clientes,
                message: 'rutina collection requested successfully'
            });
        } catch (error) {
            next(error);
        }
    });

    router.delete("/", async function(req, res, next){
        const { body: data } = req;

        try {
            const clienteDeleted = await registroService.deleteCliente(data);
            res.status(200).json({
                data: clienteDeleted,
                message: 'Cliente succesfully deleted'
            });

        } catch(err) {
            res.status(200).json({
                message: 'Cliente not deleted'
            });
            next(err);
        }
    });

    router.post("/", async function(req, res, next){
        const { body: data } = req;

        try {
            const clienteUpdated = await registroService.updateCliente(data);
            res.status(200).json({
                data: clienteUpdated,
                message: 'Cliente succesfully updated'
            });

        } catch(err) {
            res.status(200).json({
                message: 'Cliente not updated'
            });
            next(err);
        }
    });

}


async function sendEmail(data, token) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'carlos.nodeemailer@gmail.com',
          pass: 'Nodeemailer195'
        }
    });

    var mailOptions = {
        from: 'carlos.nodeemailer@gmail.com',
        to: data.email,
        subject: 'This is your TOKEN!!!!',
        text: 'Welcome to our family ' + data.nombre + '!!!! \nThis is your Token: ' + token
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(200).json({
            message: 'There was an error sending the Token to ' + data.email
            });
        } else {
          console.log('Email sent');
        }
    });
}

module.exports = registroAPI;