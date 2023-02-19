class ArrowFactory {

    #drawer
    #physic
    #effect

    constructor(ctx) {
        this.#drawer = new ArrowDrawer(ctx);
        this.#physic = new DefaultProjectilePhysic();
        this.#effect = new NormalHitEffect();
    }

    createArrow(tower, enemy, speed, size, dmg) {
        return new Projectile(tower, enemy, speed, size, dmg, this.#drawer, this.#physic, this.#effect);
    }
}
