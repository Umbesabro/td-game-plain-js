class EnemyDieAnimation extends Sprite {
    constructor(x, y, stateManager, cfg) {
        super({
            x, y,
            imageSrc: cfg.dieAnimation.imgSrc,
            frames: {
                max: cfg.dieAnimation.maxFrames,
                hold: cfg.dieAnimation.hold
            },
            offset: {
                x: -Enemy.size * 2,
                y: -Enemy.size * 2
            },
            stateManager
        })
    }

    finished() {

        return this.cycleCount >= 1;
    }
}
