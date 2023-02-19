class RocketDrawer extends ProjectileDrawer {

    #stateManager
    #ctx;

    constructor(stateManager) {
        super();
        this.#stateManager = stateManager;
        this.#ctx = this.#stateManager.getContext();
    }
    draw(x, y, size) {
        this.#ctx.beginPath();
        const oldStrokeStyle = this.#ctx.strokeStyle;
        this.#ctx.strokeStyle = "red";
        this.#ctx.strokeStyle = oldStrokeStyle
        this.#ctx.rect(x, y, size, size * 2);
        this.#ctx.fill();
    }

    drawHitAnimation(x, y, options = {}) {
        this.#stateManager.addExplosion(x , y, options.range);
    }
}
