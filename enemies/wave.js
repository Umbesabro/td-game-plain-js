class Wave {

    #level
    #stateManager
    #maxLevel = 10
    #additionalEnemiesPerLevel = 5
    #baseEnemiesNumber = 10

    constructor(level, stateManager) {
        this.#level = level > this.#maxLevel ? this.#maxLevel : level;
        this.#stateManager = stateManager;
        this.#createEnemiesFromData();
    }

    #createEnemiesFromData() {
        const { pathMinX, pathMaxX, enemySpawnPathMinY, enemySpawnPathMaxY } = this.#stateManager.getMetaData();
        if (pathMinX === undefined || pathMaxX === undefined || enemySpawnPathMinY === undefined || enemySpawnPathMaxY === undefined) return [];
        waveEnemiesTypes.forEach(type => {
            let previouseX = 0;
            for (let j = 0; j < wavesData[this.#level][type]; j++) {
                let x = 0;
                if (previouseX) {
                    x = previouseX - Math.random() * 25 - Math.random() * 30;
                    previouseX = x;
                } else {
                    x = pathMinX;
                    previouseX = -1;
                }
                this.#stateManager.addEnemyType(x, enemySpawnPathMinY + Math.random() * (enemySpawnPathMaxY - enemySpawnPathMinY), type);
            }
        })
    }

    hasBeenDefeated() {
        const enemies = this.#stateManager.getEnemies();
        return !enemies || !enemies.length || enemies.every(e => {
            return !e.isAlive()
        }
        );
    }
}
