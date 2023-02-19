
class BuildingMenuCell {

    #x
    #y
    #stateManager
    #towerType
    #ctx
    #size
    #selected
    #shootsPerSecond
    #imgLoaded

    constructor(x, y, towerType, stateManager) {
        this.#x = x;
        this.#y = y;
        this.#stateManager = stateManager;
        this.#ctx = this.#stateManager.getContext();
        this.#towerType = towerType;
        this.#shootsPerSecond = (1 / (towersCfg[towerType].framesPerFire / 60)).toFixed(1);
        this.#selected = false;
        this.loadImage();
    }

    loadImage() {
        this.image = new Image();
        this.image.src = this.#selected ? towersCfg[this.#towerType].assets.board['selected_1lvl']: towersCfg[this.#towerType].assets.board['1lvl'];
        this.#imgLoaded = false;
        this.image.onload = () => {
            this.#size = { w: this.image.width, h: this.image.height };
            this.#imgLoaded = true;
        };
    }

    draw() {
        if (this.#imgLoaded) {
            this.#ctx.drawImage(this.image, this.#x, this.#y);
            this.#ctx.font = 'bold 12px Arial';
            const xOffset = this.#x + this.#size.w * 0.1
            const yOffset = 18;
            let yOffsetAcc = 50;
            this.#ctx.fillText(`Dmg: ${towersCfg[this.#towerType].dmg || 0}`, xOffset, this.#y + this.#size.h * 0.15 + yOffsetAcc);
            this.#ctx.fillText(`Cost: ${towersCfg[this.#towerType].cost || 0}`, xOffset + this.#size.w * 0.57, this.#y + this.#size.h * 0.15 + yOffsetAcc);
            yOffsetAcc += yOffset;
            this.#ctx.fillText(`Speed: ${this.#shootsPerSecond}/sec`, xOffset, this.#y + this.#size.h * 0.15 + yOffsetAcc);
            yOffsetAcc += yOffset;
            switch (this.#towerType) {
                case towersCfg.Rocket.name:
                    this.#ctx.fillText('Special: AoE explosion', xOffset, this.#y + this.#size.h * 0.15 + yOffsetAcc);
                    yOffsetAcc += yOffset;
                    break;
                case towersCfg.Frost.name:
                    this.#ctx.fillText('Special: AoE freeze', xOffset, this.#y + this.#size.h * 0.15 + yOffsetAcc);
                    yOffsetAcc += yOffset;
                    break;
            }
        }
    }

    collidesWithMouse() {
        return this.#x <= this.#stateManager.getMouse().x &&
            this.#stateManager.getMouse().x <= this.#x + this.#size.w &&
            this.#y <= this.#stateManager.getMouse().y &&
            this.#stateManager.getMouse().y <= this.#y + this.#size.h;
    }

    setSelected(selected) {
        this.#selected = selected;
        this.loadImage();
        this.#stateManager.setSelectedTowerType(this.#towerType);
    }
}
