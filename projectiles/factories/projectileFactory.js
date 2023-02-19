class ProjectileFactory {

    #arrowFactory
    #rocketFactory
    #frozenShardFactory
    #cellSize

    constructor(stateManager) {
        const { cellSize } = stateManager.getMetaData();
        this.#cellSize = cellSize;
        this.#arrowFactory = new ArrowFactory(stateManager.getContext());
        this.#rocketFactory = new RocketFactory(stateManager);
        this.#frozenShardFactory = new FrozenShardFactory(stateManager);
    }
    createArrow(tower, enemy, speed, size, dmg) {
        const cellCenter = this.getTowerCellCenter(tower);
        return this.#arrowFactory.createArrow(cellCenter, enemy, speed, size, dmg);
    }

    createRocket(tower, enemy, speed, size, dmg, range) {
        const cellCenter = this.getTowerCellCenter(tower);
        return this.#rocketFactory.createRocket(cellCenter, enemy, speed, size, dmg, range);
    }

    createFrozenShard(tower, enemy, speed, size, slowRate, range, duration) {
        const cellCenter = this.getTowerCellCenter(tower);
        return this.#frozenShardFactory.createFrozenShard(cellCenter, enemy, speed, size, { range, slowRate, duration });
    }

    getTowerCellCenter(tower) {
        const halfCell = this.#cellSize / 2;
        return { x: tower.getX() + halfCell, y: tower.getY() + halfCell };
    }
}
