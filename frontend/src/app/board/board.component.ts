import { Component } from '@angular/core';

import { CellType } from '../../../../domain/types'
import { Cell } from '../../../../domain/cell';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent {
    cards: Cell[];

    constructor() {
        this.cards = [
            new Cell(CellType.FakeWater),
            new Cell(CellType.FakeWater),
            new Cell(CellType.FakeWater),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare),
            new Cell(CellType.FlightSquare)
        ]
    }

}
