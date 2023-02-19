class FrozenShardDrawer extends ProjectileDrawer {

    #stateManager
    #ctx;

    constructor(stateManager) {
        super();
        this.#stateManager = stateManager;
        this.#ctx = this.#stateManager.getContext();
    }
    draw(x, y, size) {
        this.#ctx.beginPath();
        const oldFilleStyle = this.#ctx.fillStyle;
        this.#ctx.fillStyle = "blue";
        this.#ctx.fillStyle = oldFilleStyle;
        this.#ctx.rect(x, y, size, size * 2);
        this.#ctx.fill();
    }

    drawHitAnimation(x, y, options = {}) {
        this.#stateManager.addExplosion(x , y, options.range); // todo add graphic effect
    }
}
