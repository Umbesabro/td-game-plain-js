class FrozenShardFactory {

    #drawer
    #physic
    #effect

    constructor(stateManager) {
        this.#drawer = new FrozenShardDrawer(stateManager);
        this.#physic = new DefaultProjectilePhysic();
        this.#effect = new FrozenNovaEffect(stateManager);
    }

    createFrozenShard(tower, enemy, speed, size, options) {
        return new Projectile(tower, enemy, speed, size, 0, this.#drawer, this.#physic, this.#effect, options);
    }
}
