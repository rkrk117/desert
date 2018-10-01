import { Component, Input } from '@angular/core';

import { CellType } from '../../../../domain/types'
import { Cell } from '../../../../domain/cell';

@Component({
    selector: 'app-cell',
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.css']
})
export class CellComponent {
    @Input() cell: Cell;
    types = CellType;
}
