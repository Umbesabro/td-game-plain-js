
class BuildingMenu {

    #buildingCells

    constructor(x, y, stateManager) {
        const cellSize = 196;
        this.#buildingCells = [];
        const defaultBuilding = new BuildingMenuCell(x, y, towersCfg.Archer.name, stateManager);
        defaultBuilding.setSelected(true);
        this.#buildingCells.push(defaultBuilding);
        this.#buildingCells.push(new BuildingMenuCell(x + cellSize + 25, y, towersCfg.Rocket.name, stateManager));
        this.#buildingCells.push(new BuildingMenuCell(x + 2 * cellSize + 50, y, towersCfg.Frost.name, stateManager));
    }

    draw() {
        this.#buildingCells.forEach(cell => cell.draw());
    }

    handleClick() {
        let cellClicked;

        this.#buildingCells.forEach(cell => {
            const collides = cell.collidesWithMouse();
            if (collides) {
                cellClicked = cell;
            }            
        })

        if (cellClicked) {
            this.#buildingCells.forEach(cell => cell.setSelected(false));
            cellClicked.setSelected(true);
        }
    }
}
