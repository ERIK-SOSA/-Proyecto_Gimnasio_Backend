const express = require('express');
var cors = require('cors');
const app = express();
const server = require('http').Server(app);
const socket = require('./lib/socket-server');
const { config } = require('./config/index');
const controllers = require('./routes/index.js');

app.use(cors());
app.use(express.json());
socket.connect(server);
controllers(app);

server.listen(config.port, function(){
    console.log(`Listening http://localhost:${config.port}`);
});