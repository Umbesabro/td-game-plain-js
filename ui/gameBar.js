class GameBar {
    #stateManager

    constructor(stateManager) {
        this.#stateManager = stateManager;
        const { worldCanvasOffset } = this.#stateManager.getMetaData();
        this.killCountBoard = new StatsBoard(worldCanvasOffset * 8 + 25, 30, 'Killed', 0, this.#stateManager.getContext());
        this.goldCountBoard = new StatsBoard(worldCanvasOffset * 8 + 25, 130, 'Gold', 0, this.#stateManager.getContext());
        this.levelBoard = new StatsBoard(worldCanvasOffset * 6 + 140, 30, 'Level', 0, this.#stateManager.getContext());
        this.liveBoard = new StatsBoard(worldCanvasOffset * 6 + 140, 130, 'Lives', 0, this.#stateManager.getContext());
    }
    draw() {
        const { worldCanvasOffset } = this.#stateManager.getMetaData();
        const gameState = this.#stateManager.getGameState();
        const ctx = this.#stateManager.getContext();
        this.killCountBoard.updateValue(gameState.killCount);
        this.goldCountBoard.updateValue(gameState.gold);
        this.levelBoard.updateValue(gameState.level);
        this.liveBoard.updateValue(gameState.lives)
        this.killCountBoard.draw();
        this.goldCountBoard.draw();
        this.levelBoard.draw();
        this.liveBoard.draw();
    }
}
