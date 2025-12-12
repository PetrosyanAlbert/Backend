class Car {
    constructor(type, model, year) {
        this.type = type;
        this.model = model;
        this.year = year;
    }

    getInfo() {
        console.log(`${this.type}, ${this.model}, ${this.year}`);
    }

    drive() {
        console.log(`This ${this.model} can drive very fast`);
    }
}

module.exports = Car;