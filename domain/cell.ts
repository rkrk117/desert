import { CellType } from './types';

export class Cell {
    private type: CellType;
    private sand: number = 0;
    opened = false;

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