
class GameHandler {

    #stateManager

    constructor(stateManager) {
        this.#stateManager = stateManager;
    }

    handleGame = () => {
        this.handleTowers();
        this.handleProjectiles();
        this.handleEnemies();
        this.handleDieAnimations();
        this.handleParticles();
        this.handleExplosions();
        this.handleWaves();
    }

    handleProjectiles = () => {
        const projectiles = this.#stateManager.getProjectiles();
        projectiles.forEach(p => p.update());
        let i = projectiles.length;
        while (i--) {
            if (projectiles[i].didHitEnemy()) {
                projectiles.splice(i, 1);
            }
        }
        this.#stateManager.setProjectiles(projectiles);
    }

    handleParticles = () => {
        let particles = this.#stateManager.getParticles();
        particles = particles.filter(p => !p.shouldDisappear());
        particles.forEach(p => p.update());
        this.#stateManager.setParticles(particles);
    }

    handleExplosions = () => {
        let explosions = this.#stateManager.getExplosions();
        explosions = explosions.filter(e => !e.shouldDisappear());
        explosions.forEach(e => e.update());
        this.#stateManager.setExplosions(explosions);
    }

    handleEnemies = () => {
        let enemies = this.#stateManager.getEnemies();
        enemies = enemies.filter(e => e.isAlive());
        enemies.sort((e1, e2) => e1.getY() - e2.getY()).forEach(e => e.update());
        let i = enemies.length;
        while (i > 0) {
            i--;
            if (enemies[i].reachedEnd()) {
                enemies.splice(i, 1);
                const gameState = this.#stateManager.getGameState();
                gameState.lives--;
                this.#stateManager.setGameState(gameState);
            }
        }
        this.#stateManager.setEnemies(enemies);
    }

    handleTowers = () => {
        const towers = this.#stateManager.getTowers();
        towers.sort((t1, t2) => t1.getY() - t2.getY()).forEach(tower => tower.update());
    }

    handleDieAnimations = () => {
        const dieAnimations = this.#stateManager.getDieAnimations();
        let i = dieAnimations.length;
        while (i > 0) {
            i--;
            dieAnimations[i].update();
            if (dieAnimations[i].finished()) {
                dieAnimations.splice(i, 1);
            } else {
                dieAnimations[i].draw();
            }
        }
    }

    handleWaves = () => {
        const gameState = this.#stateManager.getGameState();
        if (!gameState.level) {
            gameState.level = 1;
            this.#stateManager.setGameState(gameState);
        }
        if (!gameState.wave) {
            const wave = new Wave(gameState.level, this.#stateManager);
            gameState.wave = wave;
            gameState.isBreak = false;
            this.#stateManager.setGameState(gameState);
        } else if (gameState.wave.hasBeenDefeated() && !gameState.isBreak) {
            const gameState = this.#stateManager.getGameState();
            gameState.isBreak = true;
            this.#stateManager.setGameState(gameState);
            setTimeout(() => {
                const gameState = this.#stateManager.getGameState();
                gameState.isBreak = false;
                gameState.level++;
                const wave = new Wave(gameState.level, this.#stateManager);
                gameState.wave = wave;
                this.#stateManager.setGameState(gameState);
            }, 5000);
        }
    }
}