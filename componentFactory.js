
class ComponentFactory {
    #projectileFactory
    #ctx
    #stateManager

    constructor(stateManager) {
        this.#ctx = stateManager.getContext();
        this.#stateManager = stateManager;
        this.#projectileFactory = new ProjectileFactory(stateManager);
    }

    createParticle = (x, y, size) => new Particle(x, y, Math.random() * size, 0.25, this.#ctx);
    createExplosion = (x, y, size) => new Explosion(this.#ctx, x, y, size); // unify with particle

    createArrow = (shootingTower, targetEnemy, speed, size, dmg) => this.#projectileFactory.createArrow(shootingTower, targetEnemy, speed, size, dmg);
    createRocket = (shootingTower, targetEnemy, speed, size, dmg, range) => this.#projectileFactory.createRocket(shootingTower, targetEnemy, speed, size, dmg, range);
    createFrozenShard = (shootingTower, targetEnemy, speed, size, slowRate, range, duration) =>
        this.#projectileFactory.createFrozenShard(shootingTower, targetEnemy, speed, size, slowRate, range, duration);

    createTower = (cell, type) => {
        switch (type) {
            case towersCfg.Archer.name:
                return new ArcherTower(cell, this.#stateManager);
            case towersCfg.Rocket.name:
                return new RocketTower(cell, this.#stateManager);
            case towersCfg.Frost.name:
                return new FrostTower(cell, this.#stateManager);
        }
    }
    createEnemySoldier = (x, y) => new Enemy(x, y, this.#stateManager, ENEMY_CFG[ENEMY_TYPE.soldiers]);
    createEnemySprinter = (x, y) => new Enemy(x, y, this.#stateManager, ENEMY_CFG[ENEMY_TYPE.sprinters]);
    createEnemyBoss = (x, y) => new Enemy(x, y, this.#stateManager, ENEMY_CFG[ENEMY_TYPE.bosses]);
    createOrcSoldierDieAnimation = (x, y) => new EnemyDieAnimation(x, y, this.#stateManager, ENEMY_CFG[ENEMY_TYPE.soldiers]);
    createOrcSprinterDieAnimation = (x, y) => new EnemyDieAnimation(x, y, this.#stateManager, ENEMY_CFG[ENEMY_TYPE.sprinters]);
    createOrcBossDieAnimation = (x, y) => new EnemyDieAnimation(x, y, this.#stateManager, ENEMY_CFG[ENEMY_TYPE.bosses]);
}
