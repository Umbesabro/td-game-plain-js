class Enemy extends Sprite {
    static size = 22
    #isAlive
    #gameState
    #isFrozen
    #frozenEffect
    #goldGain
    #cfg
    #speed
    #hp

    constructor(x, y, stateManager, cfg) { // TODO destruct, remove default
        super({
            x, y,
            imageSrc: cfg.walkAnimation.imgSrc,
            frames: {
                max: cfg.walkAnimation.maxFrames,
                hold: cfg.walkAnimation.hold
            },
            offset: {
                x: -Enemy.size * 2,
                y: -Enemy.size * 2
            },
            stateManager
        })
        this.#cfg = cfg;
        this.#hp = cfg.hp;
        this.#speed = cfg.speed;
        this.#isAlive = true;
        this.#goldGain = cfg.goldGain;
        this.#gameState = stateManager.getGameState();
        this.#isFrozen = false;
    }

    update() {
        super.update();
        this.position.x += this.#speed;
        if (this.#isAlive && this.position.x >= this.stateManager.getMetaData().pathMinX) {
            this.draw();
            this.#frozenEffect?.update();
        }
    }

    takeDamage(dmg) {
        this.#hp -= dmg;
        if (this.#hp <= 0 && this.#isAlive) {
            this.#die();
        }
    }

    #die() {
        this.#isAlive = false;
        this.#gameState.killCount++;
        this.#gameState.gold += this.#goldGain ? this.#goldGain : 2; // todo gold
        this.stateManager.addDieAnimation(this.position.x, this.position.y, this.#cfg.type);
    }

    reachedEnd() {
        const reachedEnd = this.position.x + 2 * Enemy.size >= this.stateManager.getCanvas().width;
        return reachedEnd;
    }

    isAlive() {
        return this.#isAlive;
    }

    getX() {
        return this.position.x;
    }

    getY() {
        return this.position.y;
    }

    getSize() {
        return Enemy.size;
    }

    getSpeed() {
        return this.#speed;
    }

    slow({ duration, slowRate }) {
        if (!this.#isFrozen) {
            this.#frozenEffect = new FrozenEffectOnEnemy(this, duration, slowRate)
            this.#frozenEffect.apply()
        }
    }

    freeze(slowRate) {
        this.#isFrozen = true
        this.#speed *= slowRate;
        this.changeImage(this.#cfg.walkAnimation.frozenImgSrc)
    }

    unfreeze() {
        this.#speed = this.#cfg.speed;
        this.#isFrozen = false
        this.#frozenEffect = undefined
        this.changeImage(this.#cfg.walkAnimation.imgSrc)
    }

    isFrozen() {
        return !this.#frozenEffect?.isApplied() !== undefined && !this.#frozenEffect?.isApplied();
    }
}
