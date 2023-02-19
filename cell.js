class Cell {
    #x
    #y
    #size
    #stateManager

    constructor(x, y, cellSize, stateManager) {
        const {worldCanvasOffset} = stateManager.getMetaData();
        this.#x = x;
        this.#y = worldCanvasOffset + y;
        this.#size = cellSize;
        this.#stateManager = stateManager;
    }

    update() {

    }

    draw() {
        const ctx = this.#stateManager.getContext();
        ctx.strokeStyle = "black";
        ctx.beginPath();
        if (this.collidesWithMouse()) {
            ctx.strokeRect(this.#x, this.#y, this.#size, this.#size);
        }
        ctx.fill();
    }

    collidesWithMouse() {
        return this.#x <= this.#stateManager.getMouse().x && 
            this.#stateManager.getMouse().x <= this.#x + this.#size &&
            this.#y <= this.#stateManager.getMouse().y &&
            this.#stateManager.getMouse().y <= this.#y + this.#size;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    getSize() {
        return this.#size;
    }
}

