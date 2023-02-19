class FrostTower extends Tower { // todo rename file

    #projectileSpeed = 10
    #projectileSize = 4
    #slowRate
    #name
    #range
    #duration

    constructor(cell, stateManager) {
        super(cell, stateManager);
        this.#name = towersCfg.Frost.name;
        const { framesPerFire, range, slowRate, duration } = towersCfg[this.#name];
        this.framesPerFire = framesPerFire;
        this.#range = range;
        this.#slowRate = slowRate;
        this.#duration = duration;
    }

    fire(enemy) {
        this.stateManager.addFrozenShard(this, enemy, this.#projectileSpeed, this.#projectileSize, this.#slowRate, this.#range, this.#duration);
    }

    draw() {
        this.drawer.draw(this.x, this.y, 22, this.#name);
    }
}
