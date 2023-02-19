class ArcherTower extends Tower {

    #projectileSpeed = 6
    #projectileSize = 4

    #dmg
    #name

    constructor(cell, stateManager) {
        super(cell, stateManager);
        this.#name = towersCfg.Archer.name;
        const {dmg, framesPerFire} = towersCfg[this.#name];
        this.#dmg = dmg;
        this.framesPerFire = framesPerFire;
    }

    fire(enemy) {
        this.stateManager.addArrow(this, enemy, this.#projectileSpeed, this.#projectileSize, this.#dmg);
    }

    draw() {
        this.drawer.draw(this.x, this.y, 22, this.#name);
    }
}
