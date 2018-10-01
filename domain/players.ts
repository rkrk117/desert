import { Character } from './types';
import { Point } from './point';

export interface IPlayer {
    getCharacter(): Character;
    getWater(): number;
    setAsActor(): void;
    getPosition(): Point;
    setPosition(point: Point): void;

    /**
     * return number of water we have after this operation
     */
    addWater(n: number): number;

    /**
     * доска должна проверить есть ли на пути препятствия и вызвать этот метод,
     * он возвращает true, если персонаж может так переместиться
     * @param direction 
     * @param hasProblems - встретились ли на пути препятствия
     * @param teleport - бежит ли персонаж ногами или телепортируется
     */
    move(direction: Point, hasProblems: boolean, teleport: boolean): boolean

    /**
     * returns how many sand it cans to dig
     */
    dig(): number
}

export class Player {
    protected character: Character;
    protected position: Point;
    protected water: number;
    protected maxWater: number;
    protected availableActions: number;
    constructor(_position: Point) {
        this.position = _position.clone();
        this.availableActions = 0;
    }

    setAsActor() {
        this.availableActions = 4;
    }

    getCharacter(): Character {
        return this.character;
    }

    getWater(): number {
        return this.water;
    }

    /**
     * return number of water we have after this operation
     */
    addWater(n: number): number {
        this.water += n;
        if (this.water > this.maxWater) {
            this.water = this.maxWater;
        }
        return n;
    }

    getPosition(): Point {
        return this.position.clone();
    }

    setPosition(point: Point): void {
        this.position = point.clone();
    }

    /**
     * доска должна проверить есть ли на пути препятствия и вызвать этот метод,
     * он возвращает true, если персонаж может так переместиться
     * @param direction 
     * @param hasProblems - встретились ли на пути препятствия
     * @param teleport - бежит ли персонаж ногами или телепортируется
     */
    move(direction: Point, hasProblems: boolean, teleport: boolean): boolean {
        if (this.availableActions > 0) {
            this.availableActions--;
        } else {
            return false;
        }
        if (hasProblems) {
            return false;
        }
        let newPosition = this.position.clone();
        if (newPosition.add(direction)) {
            if (teleport) {
                this.position = newPosition;
                return true;
            } else if (Math.abs(direction.i) === 1 && direction.j === 0 ||
                            Math.abs(direction.j) === 1 && direction.i === 0) {
                this.position = newPosition;
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * returns how many sand it cans to dig
     */
    dig(): number {
        return 1;
    }
}

export class Archeologist extends Player {
    constructor(_position: Point) {
        super(_position);
        this.character = Character.Archeologist;
        this.maxWater = 3;
        this.water = 3;
    }

    dig(): number {
        return 2;
    }
}

export class Scout extends Player {
    constructor(_position: Point) {
        super(_position);
        this.character = Character.Scout;
        this.maxWater = 3;
        this.water = 3;
    }
}

export class Explorer extends Player {
    constructor(_position: Point) {
        super(_position);
        this.character = Character.Explorer;
        this.maxWater = 4;
        this.water = 4;
    }
}

export class Navigator extends Player {
    constructor(_position: Point) {
        super(_position);
        this.character = Character.Navigator;
        this.maxWater = 4;
        this.water = 4;
    }
}

export class Meteorologist extends Player {
    constructor(_position: Point) {
        super(_position);
        this.character = Character.Meteorologist;
        this.maxWater = 4;
        this.water = 4;
    }
}

export class WaterKeeper extends Player {
    constructor(_position: Point) {
        super(_position);
        this.character = Character.WaterKeeper;
        this.maxWater = 5;
        this.water = 5;
    }
}