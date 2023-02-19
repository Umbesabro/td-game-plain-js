//abstract
class Tower {
    range = 300;
    #tik = 0;
    #cell
    #firstShoot = true // todo change it
    x
    y
    drawer 
    stateManager
    framesPerFire = 60 / 4; //fps is 60, 60 framesPerFire = 1 fire per second, 00 / 4 means 4 shoots per second seems not working
    constructor(cell, stateManager) {
        this.#cell = cell;
        this.#cell.hasTower = true;
        this.x = this.#cell.getX();
        this.y = this.#cell.getY();
        this.stateManager = stateManager
        this.drawer = this.stateManager.getTowerDrawer();
    }


    //abstract
    fire() {
    }

    update() {
        this.#tik++;
        if (this.#tik % this.framesPerFire === 0 || this.#firstShoot) {
            this.#firstShoot = false;
            const targetEnemy = this.findEnemyToShoot();
            if (targetEnemy) {
                this.fire(targetEnemy);
            }
        }
        this.draw();
    }

    findClosestEnemy() {
        const enemies = this.stateManager.getEnemies();
        const cellMidX = this.#cell.getX() + this.#cell.getSize() / 2;
        const cellMidY = this.#cell.getY() + this.#cell.getSize() / 2;
        const enemiesInRangeWithDist = 
            GameUtils.findEnemiesInRangeWithDist(enemies, cellMidX, cellMidY, this.range, this.stateManager.getMetaData().pathMinY);
        return enemiesInRangeWithDist.sort((e1, e2) => e1.distance - e2.distance)[0]?.enemy;
    }

    calculateDistanceToEnemy(enemy) {
        return Math.sqrt(Math.pow(this.#cell.getX() - enemy.getX(), 2) + Math.pow(this.#cell.getY() - enemy.getY(), 2))
    }

    findEnemyToShoot() {
        if (this.isTargetEnemyAlive() && this.isTargetEnemyInRange() ) {
            return this.targetEnemy;
        } else {
            this.targetEnemy = this.findClosestEnemy();
            return this.targetEnemy;
        }
    }

    isTargetEnemyInRange() {
        return this.range >= GameUtils.calculateDistanceToEnemy(this.targetEnemy, this.#cell.getX(), this.#cell.getY());
    }

    isTargetEnemyAlive() {
        return this.targetEnemy && this.targetEnemy.isAlive();
    }

    getCell() {
        return this.#cell;
    }

    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}
