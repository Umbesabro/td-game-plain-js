
class State {
    #data

    constructor() {
        this.#data = {};
    }

    getProperty(property) {
        return this.#data[property];
    }

    setProperty(property, value) {
        this.#data[property] = value;
    }
}
