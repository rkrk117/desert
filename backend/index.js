"use strict";
exports.__esModule = true;
var express = require("express");
var box = require("./box");
var app = express();
var index = 1;
var worlds = {};
app.get('/newWorld', function (req, res) {
    worlds[index] = new box.Box(1);
    console.log(index + " - created");
    index++;
    res.json(index - 1);
});
app.get(/.getStatus..+/, function (req, res) {
    var room = req.originalUrl.match(/.getStatus.(.+)/)[1];
    if (!worlds[Number(room)]) {
        res.sendStatus(404);
    }
    res.json(worlds[room]);
});
app.get(/.room.[0-9]+.addPlayer..+/, function (req, res) {
    var parsedPath = req.originalUrl.match(/.room.([0-9])+.addPlayer.(.+)/);
    console.log(parsedPath);
    var room = parsedPath[1];
    var character = parsedPath[2];
    if (!worlds[Number(room)]) {
        res.sendStatus(404);
    }
    if (worlds[Number(room)].addPlayer((Number.parseInt(character)))) {
        res.sendStatus(200);
    }
    res.sendStatus(404);
});
app.listen(3001, function () {
    console.log('Server is listening on port 3000');
});
