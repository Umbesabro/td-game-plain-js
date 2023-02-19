class RocketTower extends Tower { // todo rename file

    #projectileSpeed = 10
    #projectileSize = 4
    #dmg
    #name
    #range

    constructor(cell, stateManager) {
        super(cell, stateManager);
        this.#name = towersCfg.Rocket.name;
        const {dmg, framesPerFire, range} = towersCfg[this.#name];
        this.#dmg = dmg;
        this.framesPerFire = framesPerFire;
        this.#range = range;
    }

    fire(enemy) {
        this.stateManager.addRocket(this, enemy, this.#projectileSpeed, this.#projectileSize, this.#dmg, this.#range);
    }

    draw() {
        this.drawer.draw(this.x, this.y, 22, this.#name);
    }
}
