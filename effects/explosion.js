class Explosion { // todo rename
    #x
    #y
    #maxSize
    #duration
    #increaseStep
    #step
    #ctx
    #currentSize

    constructor(ctx, x, y, size) {
        this.#ctx = ctx
        this.#x = x;
        this.#y = y;
        this.#maxSize = size;
        this.#duration = 10;
        this.#increaseStep = this.#maxSize / this.#duration;
        this.#step = 0;
        this.#currentSize = 0;
    }

    update() {
        this.#step++;
        this.#currentSize = this.#step * this.#increaseStep;
        this.draw();
    }

    draw() {
        this.#ctx.beginPath();
        const oldStrokeStyle = this.#ctx.strokeStyle;
        this.#ctx.strokeStyle = "red";
        this.#ctx.strokeStyle = oldStrokeStyle
        this.#ctx.arc(this.#x, this.#y, this.#currentSize, 0, Math.PI * 2);
        this.#ctx.stroke();
    }

    shouldDisappear() { //TODO Common in effects - move
        return this.#duration <= this.#step;
    }
}