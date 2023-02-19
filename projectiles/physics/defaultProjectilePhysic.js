class DefaultProjectilePhysic {

    update(x, y, speed, target) {
        const angle  = Math.atan2(y - target.getY(), x - target.getX());
        const vector = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        const newX = x - vector.x * speed;
        const newY = y - vector.y * speed;
        return [newX, newY];      
    }

    collidesWithEnemy(x, y, projectileSize, enemy) {
        const vector = { x: Math.abs(x - enemy.getX()), y: Math.abs(y - enemy.getY())};
        const dist = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
        return dist <= projectileSize + enemy.getSize();
    }
}
