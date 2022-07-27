const { MongoClient } = require('mongodb');
const MongoLib = require('./mongo');
const stream = require('stream');
const { config } = require("../config");
const { socket } = require('./socket-server');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}.lkddp.mongodb.net/test`;

async function main() {
    const pago = new MongoClient(MONGO_URI);
    const moroso = new MongoClient(MONGO_URI);

    try {
        await pago.connect();
        await moroso.connect();

        const pipelinePago = [
            {
                $match: {
                    $and: [
                        {'operationType': 'update'},
                        {'updateDescription.updatedFields.fechaPago': {$exists: true}},
                    ]                    
                }
            }
        ];

        const pipelineMoroso = [
            {
                $match: {
                    $and: [
                        {'operationType': 'update'},
                        {'updateDescription.updatedFields.moroso': 'si'},
                        {'updateDescription.updatedFields.estado': 'inactivo'}
                    ]                    
                }
            }
        ];

        monitorPagosClientes(pago, pipelinePago);
        await monitorClienteMoroso(moroso, pipelineMoroso);

    } finally {
        await pago.close();
        await moroso.close();
    }
}

main().catch(console.error);

async function monitorPagosClientes(client, pipeline = []) {
    const collection = client.db(DB_NAME).collection("Clientes");

    const changeStream = collection.watch(pipeline);

    try {
        while (await changeStream.hasNext()) {
            let data = await changeStream.next();
            let info = await new MongoLib().get("Clientes", data.documentKey._id);
            socket.io.emit('pago', info.nombreCompleto);
            const correo = await sendEmailPagoRealizado(info);
        }
    } catch (error) {
        if (changeStream.closed) {
            console.log("Change Stream Closed.");
        } else {
            throw error;
        }
    }
}

async function monitorClienteMoroso(client, pipeline = []) {
    const collection = client.db(DB_NAME).collection("Clientes");

    const changeStream = collection.watch(pipeline);

    try {
        while (await changeStream.hasNext()) {
            let data = await changeStream.next();
            let info = await new MongoLib().get("Clientes", data.documentKey._id);
            const correo = await sendEmailClienteMoroso(info);
        }
    } catch (error) {
        if (changeStream.closed) {
            console.log("Change Stream Closed.");
        } else {
            throw error;
        }
    }
}

async function sendEmailPagoRealizado(data) {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    let todayDay = new Date().getDay();
    let todayMonth = monthNames[new Date().getMonth()];
    let todayYear = new Date().getFullYear();

    let mensualidad = 250;
    let mora;

    if (data.cantUltimoPago > 250) {
        mora = 25;
    } else {
        mora = 0;
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'carlos.nodeemailer@gmail.com',
          pass: 'Nodeemailer195'
        }
    });

    transporter.use('compile', hbs({
        viewEngine: 'express-handlebars',
        viewPath: './'
    }));

    let mailOptions = {
        from: 'carlos.nodeemailer@gmail.com',
        to: data.email,
        subject: 'Gracias por realizar tu pago!! Este es tu recibo',
        text: 'Gimnasio Ronnie Coleman',
        template: 'index',
        context: {
            Nombre: data.nombreCompleto,
            Telefono: data.telefono,
            Email: data.email,
            Mensualidad: mensualidad,
            Mora: mora,
            Total: data.cantUltimoPago,
            FechaPago: data.fechaPago,
            DiaActual: todayDay.toString(),
            MesActual: todayMonth,
            AñoActual: todayYear.toString(),

        }
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent');
        }
    });
}

async function sendEmailClienteMoroso(data) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'carlos.nodeemailer@gmail.com',
          pass: 'Nodeemailer195'
        }
    });

    var message = `Se le notifica que el estado de su membresía ha pasado a inactiva y se ha generado un cargo por mora de Q25.00 debido a que han pasado 5 días, o más, desde su última fecha de pago estipulada. <br> Fecha de pago estipulada: ` + data.fechaPago;
    let mailOptions = {
        from: 'carlos.nodeemailer@gmail.com',
        to: data.email,
        subject: 'Importante! Aviso de estado moroso.',
        text: "Gimnasio Ronnie Coleman",
        html: message
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent');
        }
    });
}