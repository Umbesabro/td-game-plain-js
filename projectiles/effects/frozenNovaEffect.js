
class FrozenNovaEffect extends ProjectileEffect {
    
    #stateManager

    constructor(stateManager) {
        super();
        this.#stateManager = stateManager;
    }

    apply(target, dmg, options = {}) { //todo dmg
        const targetMidX = target.getX() + target.getSize() / 2;
        const targetMidY = target.getY() + target.getSize() / 2;
        const enemiesInRangeWithDist = GameUtils
            .findEnemiesInRangeWithDist(this.#stateManager.getEnemies(), targetMidX, targetMidY, options.range, this.#stateManager.getMetaData().pathMinY);
        enemiesInRangeWithDist.forEach(enemyWithDist => enemyWithDist.enemy.slow(options));
    }
    
}
