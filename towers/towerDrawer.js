class TowerDrawer {

    #ctx
    #archerImage
    #rocketImage
    #frostImage
    #offset

    constructor(ctx) {
        this.#ctx = ctx;
        this.#archerImage = new Image();
        this.#archerImage.src = towersCfg.Archer.assets.tower["1lvl"];
        this.#rocketImage = new Image();
        this.#rocketImage.src = towersCfg.Rocket.assets.tower["1lvl"];
        this.#frostImage = new Image();
        this.#frostImage.src = towersCfg.Frost.assets.tower["1lvl"];
        this.#offset = -15;
    }

    drawArcherTower = (x, y) => {
        this.#ctx.drawImage(this.#archerImage, x, y + this.#offset);
    }

    drawRocketTower = (x, y, size) => {
        this.#ctx.drawImage(this.#rocketImage, x, y + this.#offset);
    }

    drawFrostTower = (x, y, size) => {
        this.#ctx.drawImage(this.#frostImage, x, y + this.#offset);
    }

    draw = (x, y, size, type) => {
        switch (type) {
            case towersCfg.Archer.name:
                this.drawArcherTower(x, y, size);
                break;
            case towersCfg.Rocket.name:
                this.drawRocketTower(x, y, size);
                break;
            case towersCfg.Frost.name:
                this.drawFrostTower(x, y, size);
                break;
        }
    }
}
