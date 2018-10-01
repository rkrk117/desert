import { Character } from './types';

export class Action {
    date: Date;
    performer: Character;
    typr: ActionType;
}

export enum ActionType {
    MoveLeft = 0,
    MoveRight = 1,
    MoveDown = 2,
    MoveTop = 3,
    Dig = 4,
    Pick = 5,
    Drink = 6
}