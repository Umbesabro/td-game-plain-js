class Projectile {
    #target
    #speed
    #x
    #y
    #size
    #drawer
    #physic
    #effect
    #dmg
    #hitEnemy
    #options

    constructor(shootFrom, enemy, speed, size, dmg, drawer, physic, effect, options = {}) {
        const { x, y } = shootFrom;
        this.#x = x;
        this.#y = y;
        this.#drawer = drawer;
        this.#physic = physic;
        this.#effect = effect;
        this.#target = enemy;
        this.#speed = speed;
        this.#size = size;
        this.#dmg = dmg;
        this.#hitEnemy = false;
        this.#options = options;
    }

    update() {
        const [newX, newY] = this.#physic.update(this.#x, this.#y, this.#speed, this.#target);
        this.#x = newX;
        this.#y = newY;
        this.#drawer.draw(this.#x, this.#y, this.#size);
        if (this.#physic.collidesWithEnemy(this.#x, this.#y, this.#size, this.#target)) {
            this.#effect.apply(this.#target, this.#dmg, this.#options);
            this.#drawer.drawHitAnimation(this.#x, this.#y, this.#options);
            this.#hitEnemy = true;
        }
    }

    didHitEnemy() {
        return this.#hitEnemy;
    }
}
