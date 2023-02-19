

window.onload = function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");

    ctx.font = "50px Georgia";

    canvas.width = 1800;
    canvas.height = 930;

    const worldCanvasOffset = canvas.height * 0.20;

    const mouse = {
        x: canvas.height / 2,
        y: canvas.width / 2
    }

    const cellSize = 64;
    const gridCols = 28;
    const gridRows = 9;
    const cellsGrid = [];
    const gameBarHeight = 2 * cellSize;
    const initialGameState = {
        gold: 75,   
        killCount: 0,
        lives: 20
    }
    let lastTime = 0;
    let timer = 0;
    const interval = 1000 / 95;

    const towerDrawer = new TowerDrawer(ctx);

    const metaData = { worldCanvasOffset, cellSize };
    const stateManager = new StateManager(ctx, metaData);
    stateManager.setCanvas(canvas);
    stateManager.setGameState(initialGameState);
    stateManager.setMouse(mouse);
    stateManager.setTowerDrawer(towerDrawer);

    const menu = new BuildingMenu(25, 25, stateManager);

    const map = new Image();
    map.src = 'assets/map2.png';


    let canvasPosition = canvas.getBoundingClientRect();

    const gameBar = stateManager.getGameBar();

    const gameHanlders = new GameHandler(stateManager);

    const handleClick = () => {
        menu.handleClick();
        for (let i = 0; i < gridCols; i++) {
            for (let j = 0; j < gridRows; j++) {
                const cell = cellsGrid[i][j];
                if (cell.collidesWithMouse()) {
                    const { pathMinY, pathMaxY, enemySpawnPathMinY, enemySpawnPathMaxY } = stateManager.getMetaData();
                    const isAboveRoad = pathMinY < mouse.y && enemySpawnPathMinY - cellSize / 2 > mouse.y;
                    const isBelowRoad = enemySpawnPathMaxY + cellSize / 2 < mouse.y && pathMaxY > mouse.y;
                    const canPutTowerOnThatCord = isAboveRoad || isBelowRoad;
                    const cost = towersCfg[stateManager.getSelectedTowerType()].cost;
                    if (canPutTowerOnThatCord && initialGameState.gold >= cost) {
                        stateManager.addTower2(cellsGrid[i][j]);
                        initialGameState.gold -= cost;
                    }
                }
            }
        }
    }

    function createGrid() {
        for (let i = 0; i < gridCols; i++) {
            for (let j = 0; j < gridRows; j++) {
                cellsGrid[i] ?
                    cellsGrid[i].push(new Cell(i * cellSize, gameBarHeight + j * cellSize, cellSize, stateManager)) :
                    cellsGrid[i] = [new Cell(i * cellSize, gameBarHeight + j * cellSize, cellSize, stateManager)];
            }
        }
    }


    function animate(timestamp) {

        if (initialGameState.lives > 0) {
            const detlaTime = timestamp - lastTime;
            lastTime = timestamp;
            if (timer > interval) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(map, 0, 0);

                for (let i = 0; i < gridCols; i++) {
                    for (let j = 0; j < gridRows; j++) {
                        cellsGrid[i][j].draw();
                    }
                }
                gameHanlders.handleGame();
                gameBar.draw();
                timer -= interval;
            } else {
                timer += detlaTime; // bug minimalization
            }
            requestAnimationFrame(animate);
            menu.draw();
        }
    }

    function setPathMinX() {
        const metaData = stateManager.getMetaData();
        metaData.pathMinX = cellsGrid[0][0].getX();
        stateManager.setMetaData(metaData);
    }

    function setPathMaxX() {
        const metaData = stateManager.getMetaData();
        metaData.pathMaxX = cellsGrid[gridCols - 1][0].getX() + cellSize;
        stateManager.setMetaData(metaData);
    }

    function setPathMinY() {
        const metaData = stateManager.getMetaData();
        metaData.pathMinY = cellsGrid[0][0].getY();
        stateManager.setMetaData(metaData);
    }

    function setPathMaxY() {
        const metaData = stateManager.getMetaData();
        metaData.pathMaxY = cellsGrid[0][gridRows - 1].getY();
        stateManager.setMetaData(metaData);
    }

    function setEnemySpawnPathMinY() {
        const metaData = stateManager.getMetaData();
        metaData.enemySpawnPathMinY = cellsGrid[0][2].getY() + cellSize / 2;
        stateManager.setMetaData(metaData);
    }

    function setEnemySpawnPathMaxY() {
        const metaData = stateManager.getMetaData();
        metaData.enemySpawnPathMaxY = cellsGrid[0][6].getY() + cellSize * 0.15;
        stateManager.setMetaData(metaData);
    }


    document.addEventListener('mousemove', function (event) {
        lastDownTarget = event.target;
        mouse.x = event.x - canvasPosition.left;
        mouse.y = event.y - canvasPosition.top;
    }, false);

    document.addEventListener('mousedown', function (event) {
        handleClick();
    }, false);

    createGrid();
    setPathMinX();
    setPathMaxX();
    setPathMinY();
    setPathMaxY();
    setEnemySpawnPathMinY();
    setEnemySpawnPathMaxY();
    animate(0);
}
