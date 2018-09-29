import { CellType, Direction, Character } from './types';
import { IPlayer, Player, WaterKeeper, Archeologist, Scout, Meteorologist,  } from './players';
import { Point } from './point';

class Cell {
    private type: CellType;
    private sand: number = 0;

    constructor(_type: CellType) {
        this.sand = 0;
        this.type = _type;
    }

    public increaseSand(n: number): void {
        this.sand += n;
        if (this.sand < 0) {
            this.sand = 0;
        }
    }
    public getSand(): number {
        return this.sand;
    }

    public getType(): CellType {
        return this.type;
    }
}

export class Desk {
    world: Cell[];
    constructor() {
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

    getCell(point: Point): Cell {
        return this.world[5 * point.j + point.i];
    }

    setCell(point: Point, cell: Cell): void {
        this.world[5 * point.j + point.i] = cell;
    }

    findCardPos(type: CellType): Point {
        for (let i = 0; i < this.world.length; i++) {
            if (this.world[i].getType() === type) {
                return new Point(i % 5, Math.floor(i / 5));
            }
        }
    }

    /**
     * Tries to move storm and returns true if managed to do it
     * @param direction 
     */
    moveStorm(direction: Point): boolean {
        let point = this.findCardPos(CellType.Storm);
        let newPoint = point.clone();
        if (newPoint.add(direction)) {
            let firstCell = this.getCell(point);
            let secondCell = this.getCell(newPoint);
            secondCell.increaseSand(1);
            this.setCell(point, secondCell);
            this.setCell(newPoint, firstCell);
            return true;
        }
        return false;
    }
}

export class Box {
    cardStack: ICard[];
    gameStarted = false;
    desk: Desk;
    storm: number;
    players: IPlayer[] = [];
    constructor(difficluty: number) {
        this.desk = new Desk();
        this.cardStack = buildCardStack();
        this.storm = difficluty;
    }

    startGame() {
        this.gameStarted = true;
    }

    addPlayer(character: Character): boolean {
        if (!this.gameStarted) {
            if (this.players.some(pl => pl.getCharacter() === character)) {
                return false;
            }
            this.players.push(new Player(this.desk.findCardPos(CellType.StartPoint)));
            return true;
        }
        return false;
    }

    getPlayerByCharacter(character: Character): IPlayer {
        return this.players.find(pl => pl.getCharacter() === character);
    }

    getPlayersByPosition(position: Point): IPlayer[] {
        return this.players.filter(pl => pl.getPosition().compare(position));
    }

    getPlayers(): Character[] {
        return this.players.map(pl => pl.getCharacter());
    }

    moveStorm(direction: Point): void {
        let oldStormLocation = this.desk.findCardPos(CellType.Storm).clone();
        if (this.desk.moveStorm(direction)) {
            let newStormLocation = this.desk.findCardPos(CellType.Storm).clone();
            this.getPlayersByPosition(newStormLocation).forEach(pl => pl.setPosition(oldStormLocation));
            if (this.getPlayerByCharacter(Character.Scout).getPosition().compare(oldStormLocation)) {
                this.desk.getCell(oldStormLocation).increaseSand(-1);
            }
        };
    }

    // TODO for players in tunnels
    drinkWater(): void {
        this.players.forEach(pl => pl.addWater(-1));
    }

    // TODO gameover for too big storm
    increaseStorm(): void {
        this.storm += 1;
    }
}

interface ICard {
    open(box: Box): void;
}

class CardMoveStorm implements ICard {
    private n: number;
    private direction: Point;
    constructor(_direction: Direction, _n: number) {
        this.n = _n;
        switch (_direction) {
            case Direction.Left:
                this.direction = new Point(-1, 0);
                break;
            case Direction.Up:
                this.direction = new Point(0, 1);
                break;
            case Direction.Right:
                this.direction = new Point(1, 0);
                break;
            case Direction.Down:
                this.direction = new Point(0, -1);
                break;
        }
    };

    open(box: Box): void {
        for (let i = 0; i++; i < this.n) {
            box.moveStorm(this.direction)
        }
    }
}

class CardSun implements ICard {
    open(box: Box): void {
        box.drinkWater();
    }
}

class CardStorm implements ICard {
    open(box: Box): void {
        box.increaseStorm();
    }
}

//TODO check all the cards
function buildCardStack(): ICard[] {
    let cards: ICard[] = [
        new CardSun(),
        new CardSun(),
        new CardSun(),
        new CardSun(),
        new CardSun(),
        new CardStorm(),
        new CardStorm(),
        new CardStorm()
    ]
    toss(cards);
    return cards;
}

function buildWorld(): Cell[] {
    let desk = [
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

function toss<T>(arr: T[]) {
    for (let i = 0; i < arr.length; i++) {
        arr.sort(() => Math.random() > 0.5 ? 1 : 0);
    }
}