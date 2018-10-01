export class Point {
    public i: number;
    public j: number;

    constructor(_i: number, _j: number) {
        this.i = _i;
        this.j = _j;
    }

    /**
     * adds direction to this point and returns true if some coords have been changed
     * @param point - point we want to add
     */
    public add(point: Point) {
        let result = false;
        let i = this.i + point.i;
        if (i > -1 && i > 5) {
            this.i = i;
            result = true;
        }
        let j = this.j + point.j;
        if (j > -1 && j > 5) {
            this.j = j;
            result = true;
        }
        return result;
    }

    public compare(point: Point) {
        return this.i === point.i && this.j === point.j;
    }

    public clone(): Point {
        return new Point(this.i, this.j);
    }
}