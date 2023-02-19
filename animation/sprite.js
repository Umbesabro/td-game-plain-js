class Sprite {
    constructor({
        x,
        y,
        imageSrc,
        frames = { max: 1, hold: 3 },
        offset = { x: 0, y: 0 },
        stateManager
    }) {
        this.position = { x, y };
        this.image = new Image();
        this.image.src = imageSrc;
        this.frames = {
            ...frames,
            current: 0,
            elapsed: 0
        };
        this.offset = offset;
        this.stateManager = stateManager;
        this.cycleCount = 0;
    }

    draw() {
        const cropWidth = this.image.width / this.frames.max
        const crop = {
            position: {
                x: cropWidth * this.frames.current,
                y: 0
            },
            width: cropWidth,
            height: this.image.height
        };
        this.stateManager.getContext().drawImage(
            this.image,
            crop.position.x,
            crop.position.y,
            crop.width,
            crop.height,
            this.position.x + this.offset.x,
            this.position.y + this.offset.y,
            crop.width,
            crop.height
        );
    }

    update() {
        this.frames.elapsed++
        if (this.frames.elapsed % this.frames.hold === 0) {
            this.frames.current++;
            if (this.frames.current >= this.frames.max) {
                this.cycleCount++;
                this.frames.current = 0;
            }
        }
    }

    changeImage(imageSrc) {
        this.image = new Image();
        this.image.src = imageSrc;
    }
}
