class ArrowDrawer extends ProjectileDrawer {


    draw(x, y, size) {
        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawHitAnimation(x, y) {
        console.log("BooM");
    }
}
