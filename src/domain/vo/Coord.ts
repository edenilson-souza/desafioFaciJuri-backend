export default class Coord {
    private value: string;

    constructor(coord: string) {
        if (!coord) throw new Error("CordX e CordY são obrigatórios");
        if (this.isInvalidCoord(coord)) throw new Error("Coordenada inválida");
        this.value = coord;
    }

    private isInvalidCoord(coord: string) {
        if (coord.length > 3) return false;
        return !coord.match(/^[0-9]+$/);
    }

    getValue() {
        return this.value;
    }
}
