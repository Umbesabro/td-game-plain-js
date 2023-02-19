class EffectOnEnemy {

    enemy
    #duration
    #count
    #applies

    constructor(enemy, duration) {
        this.enemy = enemy;
        this.#duration = duration;
        this.#count = 0;
        this.#applies = false;
    }

    hasFinished() {
        return this.#count >= this.#duration;
    }

    update() {
        if (this.#applies) {
            this.#count++;
            if (this.hasFinished()) {
                this.cancel();
            }
        }
    }

    apply() {
        this.#applies = true;
    }

    isApplied() {
        return this.#applies;
    }

    cancel() {
        this.#applies = false;
    }
}
