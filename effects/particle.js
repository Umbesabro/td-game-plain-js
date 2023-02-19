class Particle {
    #x
    #y
    #size
    #speed
    #angle 
    #maxLiveTime
    #currLiveTime
    #ctx

    constructor(x, y, size, speed, ctx) {
        this.#x = x;
        this.#y = y;
        this.#size = size;
        this.#speed = speed;
        this.#maxLiveTime = 200;
        this.#currLiveTime = 0;
        this.#ctx = ctx;
        Math.random() > 0.5 ? this.#angle = Math.random() * 3.14 : this.#angle = Math.random() * -3.14;
    }

    update() {
        this.#currLiveTime++;
        this.#size = this.#size * 0.985;
        const vector = {
            x: Math.cos(this.#angle),
            y: Math.sin(this.#angle)
        }
        this.#x -= vector.x * this.#speed;
        this.#y -= vector.y * this.#speed;
        this.draw();   
    }
    
    draw() {
        this.#ctx.beginPath();
        const oldStrokeStyle = this.#ctx.strokeStyle;
        this.#ctx.strokeStyle = "red";
        this.#ctx.strokeStyle = oldStrokeStyle
        this.#ctx.arc(this.#x, this.#y, this.#size, 0, Math.PI * 2);
        this.#ctx.fill();
    }

    shouldDisappear() {
        return this.#maxLiveTime <= this.#currLiveTime;
    }
}