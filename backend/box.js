"use strict";
exports.__esModule = true;
var Point = /** @class */ (function () {
    function Point(_i, _j) {
        this.i = _i;
        this.j = _j;
    }
    /**
     * adds direction to this point and returns true if some coords have been changed
     * @param point - point we want to add
     */
    Point.prototype.add = function (point) {
        var result = false;
        var i = this.i + point.i;
        if (i > -1 && i > 5) {
            this.i = i;
            result = true;
        }
        var j = this.j + point.j;
        if (j > -1 && j > 5) {
            this.j = j;
            result = true;
        }
        return result;
    };
    Point.prototype.clone = function () {
        return new Point(this.i, this.j);
    };
    return Point;
}());
exports.Point = Point;
var Cell = /** @class */ (function () {
    function Cell(_type) {
        this.sand = 0;
        this.sand = 0;
        this.type = _type;
    }
    Cell.prototype.increaseSand = function (n) {
        this.sand += n;
        if (this.sand < 0) {
            this.sand = 0;
        }
    };
    Cell.prototype.getSand = function () {
        return this.sand;
    };
    Cell.prototype.getType = function () {
        return this.type;
    };
    return Cell;
}());
var Desk = /** @class */ (function () {
    function Desk() {
        this.world = buildWorld();
        this.getCell(new Point(2, 0)).increaseSand(1);
        this.getCell(new Point(3, 1)).increaseSand(1);
        this.getCell(new Point(4, 2)).increaseSand(1);
        this.getCell(new Point(3, 3)).increaseSand(1);
        this.getCell(new Point(2, 4)).increaseSand(1);
        this.getCell(new Point(1, 3)).increaseSand(1);
        this.getCell(new Point(0, 2)).increaseSand(1);
        this.getCell(new Point(1, 1)).increaseSand(1);
    }
    Desk.prototype.getCell = function (point) {
        return this.world[5 * point.j + point.i];
    };
    Desk.prototype.setCell = function (point, cell) {
        this.world[5 * point.j + point.i] = cell;
    };
    Desk.prototype.findCardPos = function (type) {
        for (var i = 0; i < this.world.length; i++) {
            if (this.world[i].getType() === type) {
                return new Point(i % 5, Math.floor(i / 5));
            }
        }
    };
    Desk.prototype.moveStorm = function (direction) {
        var point = this.findCardPos(CellType.Storm);
        var newPoint = point.clone();
        if (newPoint.add(direction)) {
            var firstCell = this.getCell(point);
            var secondCell = this.getCell(newPoint);
            secondCell.increaseSand(1);
            this.setCell(point, secondCell);
            this.setCell(newPoint, firstCell);
            return true;
        }
        return false;
    };
    return Desk;
}());
exports.Desk = Desk;
var Box = /** @class */ (function () {
    function Box(difficluty) {
        this.gameStarted = false;
        this.players = [];
        this.desk = new Desk();
        this.storm = difficluty;
    }
    Box.prototype.startGame = function () {
        this.gameStarted = true;
    };
    Box.prototype.addPlayer = function (character) {
        if (!this.gameStarted) {
            if (this.players.some(function (pl) { return pl.getCharacter() === character; })) {
                return false;
            }
            this.players.push(new Player(character, this.desk.findCardPos(CellType.StartPoint)));
            return true;
        }
        return false;
    };
    Box.prototype.getPlayers = function () {
        return this.players.map(function (pl) { return pl.getCharacter(); });
    };
    return Box;
}());
exports.Box = Box;
var Player = /** @class */ (function () {
    function Player(_character, _position) {
        this.character = _character;
        this.position = _position.clone();
    }
    Player.prototype.getCharacter = function () {
        return this.character;
    };
    Player.prototype.getWater = function () {
        return this.water;
    };
    /**
     * return number of water we have after this operation
     */
    Player.prototype.addWater = function (n) {
        this.water += n;
        if (this.water > this.maxWater) {
            this.water = this.maxWater;
        }
        return n;
    };
    return Player;
}());
exports.Player = Player;
function buildWorld() {
    var desk = [
        new Cell(CellType.FlightSquare),
        new Cell(CellType.Tunnel),
        new Cell(CellType.Tunnel),
        new Cell(CellType.Tunnel),
        new Cell(CellType.Water),
        new Cell(CellType.Water),
        new Cell(CellType.FakeWater),
        new Cell(CellType.PointerCompassHorizontal),
        new Cell(CellType.PointerCompassVertical),
        new Cell(CellType.PointerDiamondHorizontal),
        new Cell(CellType.PointerDiamondVertical),
        new Cell(CellType.PointerEngineHorizontal),
        new Cell(CellType.PointerEngineVertical),
        new Cell(CellType.PointerTurbineHorizontal),
        new Cell(CellType.PointerTurbineVertical),
        new Cell(CellType.PointerCompassHorizontal),
        new Cell(CellType.Storm),
        new Cell(CellType.StartPoint),
        new Cell(CellType.UsualLocation),
        new Cell(CellType.UsualLocation),
        new Cell(CellType.UsualLocation),
        new Cell(CellType.UsualLocation),
        new Cell(CellType.UsualLocation),
        new Cell(CellType.UsualLocation),
        new Cell(CellType.UsualLocation)
    ];
    toss(desk);
    return desk;
}
function toss(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr.sort(function () { return Math.random() > 0.5 ? 1 : 0; });
    }
}
var CellType;
(function (CellType) {
    CellType[CellType["Water"] = 0] = "Water";
    CellType[CellType["FakeWater"] = 1] = "FakeWater";
    CellType[CellType["Tunnel"] = 2] = "Tunnel";
    CellType[CellType["PointerDiamondHorizontal"] = 3] = "PointerDiamondHorizontal";
    CellType[CellType["PointerDiamondVertical"] = 4] = "PointerDiamondVertical";
    CellType[CellType["PointerTurbineHorizontal"] = 5] = "PointerTurbineHorizontal";
    CellType[CellType["PointerTurbineVertical"] = 6] = "PointerTurbineVertical";
    CellType[CellType["PointerEngineHorizontal"] = 7] = "PointerEngineHorizontal";
    CellType[CellType["PointerEngineVertical"] = 8] = "PointerEngineVertical";
    CellType[CellType["PointerCompassHorizontal"] = 9] = "PointerCompassHorizontal";
    CellType[CellType["PointerCompassVertical"] = 10] = "PointerCompassVertical";
    CellType[CellType["Storm"] = 11] = "Storm";
    CellType[CellType["FlightSquare"] = 12] = "FlightSquare";
    CellType[CellType["UsualLocation"] = 13] = "UsualLocation";
    CellType[CellType["StartPoint"] = 14] = "StartPoint";
})(CellType = exports.CellType || (exports.CellType = {}));
var Direction;
(function (Direction) {
    Direction[Direction["Right"] = 0] = "Right";
    Direction[Direction["RightDown"] = 1] = "RightDown";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["LeftDown"] = 3] = "LeftDown";
    Direction[Direction["Left"] = 4] = "Left";
    Direction[Direction["LeftUp"] = 5] = "LeftUp";
    Direction[Direction["Up"] = 6] = "Up";
    Direction[Direction["RightUp"] = 7] = "RightUp";
})(Direction = exports.Direction || (exports.Direction = {}));
var Character;
(function (Character) {
    Character[Character["Archeologist"] = 0] = "Archeologist";
    Character[Character["WaterMan"] = 1] = "WaterMan";
    Character[Character["Meteorologist"] = 2] = "Meteorologist";
})(Character = exports.Character || (exports.Character = {}));
