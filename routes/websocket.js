const express = require('express');

function webSocketAPI(app) {
    const router = express.Router();
    app.use("/websocket", router);

    router.get("/", async function(req, res, next){
        res.sendFile('socket.html', { root: '.'});
    });
}

module.exports = webSocketAPI;