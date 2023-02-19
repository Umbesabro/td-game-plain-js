class GameUtils {

    static findEnemiesInRangeWithDist(enemies, fromX, fromY,  range, pathMinY) {
            return enemies
                .map(enemy => ({distance: GameUtils.calculateDistanceToEnemy(enemy, fromX, fromY), enemy}))
                .filter(e => e.distance <= range && e.enemy.getY() + e.enemy.getSize() / 2 > pathMinY);
    }

    static calculateDistanceToEnemy(enemy, fromX, fromY) {
        return Math.sqrt(Math.pow(fromX - (enemy.getX() + enemy.getSize() /2), 2) + Math.pow(fromY - (enemy.getY() + enemy.getSize() / 2), 2));
    }
}
