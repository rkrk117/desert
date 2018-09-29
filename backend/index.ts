import * as express from 'express';
import * as box from './box';
import { CellType, Direction, Character } from './types';

let app = express();

let index = 1;

let worlds: {[boxId: number]: box.Box} = {};

app.get('/newRoom', function(req, res) {
    worlds[index] = new box.Box(1);
    console.log(`${index} - created`);
    index++;
    res.json(index - 1);
});

app.get(/.room.[0-9]+.getStatus/, function(req, res) {
    let room = req.originalUrl.match(/.room.([0-9])+.getStatus/)[1];
    if (!worlds[Number(room)]) {
        res.sendStatus(404);
    }
    res.json(worlds[room]);
});

app.get(/.room.[0-9]+.addPlayer..+/, function(req, res) {
    let parsedPath = req.originalUrl.match(/.room.([0-9])+.addPlayer.(.+)/);
    let room = parsedPath[1];
    let character = parsedPath[2]
    if (!worlds[Number(room)]) {
        res.sendStatus(404);
    }
    if (worlds[Number(room)].addPlayer(<Character> (Number(character)))) {
        res.sendStatus(200);
    }
    res.sendStatus(404);
});

app.get(/.room.[0-9]+.getPlayer..+/, function(req, res) {
    let parsedPath = req.originalUrl.match(/.room.([0-9])+.getPlayer.(.+)/);
    let room = parsedPath[1];
    let character = parsedPath[2]
    if (!worlds[Number(room)]) {
        res.sendStatus(404);
    }
    let player = worlds[Number(room)].getPlayer(<Character> (Number(character)));
    if (player) {
        res.json(player);
    } else {
        res.sendStatus(404);
    }
});

app.listen(3001, function() {
    console.log('Server is listening on port 3000');
});