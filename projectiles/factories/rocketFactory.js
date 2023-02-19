class RocketFactory {

    #drawer
    #physic
    #effect

    constructor(stateManager) {
        this.#drawer = new RocketDrawer(stateManager);
        this.#physic = new DefaultProjectilePhysic();
        this.#effect = new ExplosionEffect(stateManager);
    }

    createRocket(tower, enemy, speed, size, dmg, range) {
        return new Projectile(tower, enemy, speed, size, dmg, this.#drawer, this.#physic, this.#effect, { range });
    }
}
