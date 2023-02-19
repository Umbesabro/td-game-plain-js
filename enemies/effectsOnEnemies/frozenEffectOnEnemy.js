class FrozenEffectOnEnemy extends EffectOnEnemy {

    #slowRate

    constructor(enemy, duration, slowRate) {
        super(enemy, duration);
        this.#slowRate = slowRate;
    }

    apply() {
        super.apply();
        this.enemy.freeze(this.#slowRate);
    }

    cancel() {
        super.cancel();
        this.enemy.unfreeze();
    }
}
