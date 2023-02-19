class StatsBoard {

    #x
    #y
    #text
    #value
    #img
    #ctx
    #imgLoaded
    #size

    constructor(x, y, text, value, ctx) {
        this.#x = x;
        this.#y = y;
        this.#text = text;
        this.#value = value;
        this.#ctx = ctx;
        this.#imgLoaded = false;
        this.loadImage();
    }

    loadImage() {
        this.#img = new Image();
        this.#img.src = 'assets/ui/stats_board.png';
        this.#img.onload = () => {
            this.#size = { w: this.#img.width, h: this.#img.height };
            this.#imgLoaded = true;
        }
    }

    draw() {
        if (this.#imgLoaded) {
            this.#ctx.drawImage(this.#img, this.#x, this.#y);
            this.#ctx.font = 'bold 28px Arial';
            this.#ctx.fillText(`${this.#text}: ${this.#value}`, this.#x + 0.27 * this.#size.w, this.#y + this.#size.h * 0.57);
        }
    }

    updateValue(value) {
        this.#value = value;
    }
}
