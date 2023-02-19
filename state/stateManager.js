const TOWERS_PROP = 'towers';
const PROJECTILES_PROP = "projectiles";
const PARTICLES_PROP = "particles";
const ENEMIES_PROP = "enemies";
const GAME_STATE_PROP = "gameState";
const META_DATA_PROP = "metaData";
const CONTEXT_PROP = "ctx";
const CANVAS_PROP = "canvas";
const GAME_BAR_PROP = "gameBar";
const MOUSE_PROP = "mouse";
const TOWER_DRAWER_PROP = "tower_drawer";
const SELECTED_TOWER_TYPE_PROP = "selected_tower_type_prop";
const EXPLOSIONS_PROP = "explosions_prop";
const DIE_ANIMATIONS = "die_animations";

class StateManager {

    #componentFactory
    #state
    constructor(ctx, metaData) {
        this.#state = new State();
        this.setContext(ctx);
        this.setMetaData(metaData);
        this.setParticles([]);
        this.setExplosions([]);
        this.setProjectiles([]);
        this.setEnemies([]);
        this.setTowers([]);
        this.setGameBar(new GameBar(this))
        this.setDieAnimations([]);
        this.#componentFactory = new ComponentFactory(this);
    }

    getTowers = () => this.#state.getProperty(TOWERS_PROP);
    getProjectiles = () => this.#state.getProperty(PROJECTILES_PROP);
    getParticles = () => this.#state.getProperty(PARTICLES_PROP);
    getExplosions = () => this.#state.getProperty(EXPLOSIONS_PROP);
    getEnemies = () => this.#state.getProperty(ENEMIES_PROP);
    getDieAnimations = () => this.#state.getProperty(DIE_ANIMATIONS);
    getGameState = () => this.#state.getProperty(GAME_STATE_PROP);
    getMetaData = () => this.#state.getProperty(META_DATA_PROP);
    getContext = () => this.#state.getProperty(CONTEXT_PROP);
    getCanvas = () => this.#state.getProperty(CANVAS_PROP);
    getGameBar = () => this.#state.getProperty(GAME_BAR_PROP);
    getMouse = () => this.#state.getProperty(MOUSE_PROP);
    getTowerDrawer = () => this.#state.getProperty(TOWER_DRAWER_PROP);
    getSelectedTowerType = () => this.#state.getProperty(SELECTED_TOWER_TYPE_PROP);

    setTowers = (towers) => this.#state.setProperty(TOWERS_PROP, towers);
    setProjectiles = (projectiles) => this.#state.setProperty(PROJECTILES_PROP, projectiles);
    setParticles = (particles) => this.#state.setProperty(PARTICLES_PROP, particles);
    setExplosions = (explosions) => this.#state.setProperty(EXPLOSIONS_PROP, explosions);
    setEnemies = (enemies) => this.#state.setProperty(ENEMIES_PROP, enemies);
    setGameState = (gameState) => this.#state.setProperty(GAME_STATE_PROP, gameState);
    setMetaData = (metaData) => this.#state.setProperty(META_DATA_PROP, metaData);
    setContext = (ctx) => this.#state.setProperty(CONTEXT_PROP, ctx);
    setCanvas = (canvas) => this.#state.setProperty(CANVAS_PROP, canvas);
    setGameBar = (gameBar) => this.#state.setProperty(GAME_BAR_PROP, gameBar);
    setMouse = (mouse) => this.#state.setProperty(MOUSE_PROP, mouse);
    setTowerDrawer = (td) => this.#state.setProperty(TOWER_DRAWER_PROP, td);
    setSelectedTowerType = (type) => this.#state.setProperty(SELECTED_TOWER_TYPE_PROP, type);
    setDieAnimations = (dieAnimations) => this.#state.setProperty(DIE_ANIMATIONS, dieAnimations);

    addTower = (cell) => {
        const towers = this.getTowers();
        const newTower = this.#componentFactory.createTower(cell);
        towers.push(newTower);
        this.setTowers(towers);
    }

    addTower2 = (cell) => {
        const towers = this.getTowers();
        const newTower = this.#componentFactory.createTower(cell, this.getSelectedTowerType(), this.getContext());
        towers.push(newTower);
        this.setTowers(towers);
    }

    addRocket = (shootingTower, targetEnemy, speed, size, dmg, range) => {
        const projectiles = this.getProjectiles();
        const newRocket = this.#componentFactory.createRocket(shootingTower, targetEnemy, speed, size, dmg, range);
        projectiles.push(newRocket);
        this.setProjectiles(projectiles);
    }

    addFrozenShard = (shootingTower, targetEnemy, speed, size, slowRate, range, duration) => {
        const projectiles = this.getProjectiles();
        const newRocket = this.#componentFactory.createFrozenShard(shootingTower, targetEnemy, speed, size, slowRate, range, duration);
        projectiles.push(newRocket);
        this.setProjectiles(projectiles);
    }

    addArrow = (shootingTower, targetEnemy, speed, size, dmg) => {
        const projectiles = this.getProjectiles();
        const newArrow = this.#componentFactory.createArrow(shootingTower, targetEnemy, speed, size, dmg);
        projectiles.push(newArrow);
        this.setProjectiles(projectiles);
    }

    addParticle = (x, y, size) => {
        const particles = this.getParticles();
        const newParticle = this.#componentFactory.createParticle(x, y, size);
        particles.push(newParticle);
        this.setParticles(particles);
    }

    addExplosion = (x, y, size) => {
        const explosions = this.getExplosions();
        const newExplosion = this.#componentFactory.createExplosion(x, y, size);
        explosions.push(newExplosion);
        this.setExplosions(explosions);
    }

    addEnemyType = (x, y, type) => {
        const enemies = this.getEnemies();
        let newEnemy;
        switch (type) {
            case ENEMY_TYPE.soldiers:
                newEnemy = this.#componentFactory.createEnemySoldier(x, y);
                break;
            case ENEMY_TYPE.sprinters:
                newEnemy = this.#componentFactory.createEnemySprinter(x, y);
                break;
            case ENEMY_TYPE.bosses:
                newEnemy = this.#componentFactory.createEnemyBoss(x, y);
                break;
        }
        enemies.push(newEnemy);
        this.setEnemies(enemies);
    }

    addDieAnimation = (x, y, enemyType) => {
        const dieAnimations = this.getDieAnimations();
        let dieAnimation;
        switch (enemyType) {
            case ENEMY_TYPE.soldiers:
                dieAnimation = this.#componentFactory.createOrcSoldierDieAnimation(x, y);
                break;
            case ENEMY_TYPE.sprinters:
                dieAnimation = this.#componentFactory.createOrcSprinterDieAnimation(x, y);
                break;
            case ENEMY_TYPE.bosses:
                dieAnimation = this.#componentFactory.createOrcBossDieAnimation(x, y);
                break;
        }
        dieAnimations.push(dieAnimation);
        this.setDieAnimations(dieAnimations);
    }
}
