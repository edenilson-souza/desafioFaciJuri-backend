export default class Name {
    private value: string;

    constructor(name: string) {
        if (!name || name == "") throw new Error("Nome é obrigatório");
        if (this.isInvalidName(name)) throw new Error("Nome inválido");
        this.value = name.toUpperCase();
    }

    private isInvalidName(name: string) {
        return !name.match(/[a-zA-Z] [a-zA-Z]+/);
    }

    getValue() {
        return this.value;
    }
}
