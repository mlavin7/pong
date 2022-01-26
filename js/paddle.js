

class Paddle {
    constructor(ctx, boardWidth, boardHeight, side) {
        this.ctx = ctx;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.width = 1;
        this.height = 10;
        this.position = [];
        this.side = side;
        this.direction = [0, 0];
        this.points = 0;

        this.setPosition();
        this.setListeners();
    }

    setPosition() {
        this.position[1] = this.boardHeight / 2 - this.height / 2;
        this.position[0] = this.side === 'left'
            ? 2
            : this.boardWidth - this.width - 2;
    }

    render() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.position[0], this.position[1], this.width, this.height);
    }

    move() {
        this.position[1] += this.direction[1];
        if (this.position[1] < 0) {
            this.position[1] = 0;
        }
        else if (this.position[1] + this.height > this.boardHeight) {
            this.position[1] = this.boardHeight - this.height;
        }
    }

    setListeners() {
        document.addEventListener('keydown', function (e) {
            const speed = 2;
            const key = e.key;
            if (this.side === 'left') {
                if (key === 'w') this.direction[1] = -speed;
                if (key === 's') this.direction[1] = speed;
            } else {
                if (key === 'ArrowUp') this.direction[1] = -speed;
                if (key === 'ArrowDown') this.direction[1] = speed;
            }
        }.bind(this));

        document.addEventListener('keyup', function (e) {
            const key = e.key;
            if (this.side === 'left' && (key === 'w' || key === 's')) this.direction[1] = 0;
            if (this.side !== 'left' && (key === 'ArrowUp' || key === 'ArrowDown')) this.direction[1] = 0;
        }.bind(this));
    }

    reset() {
        this.points = 0;
        this.setPosition();
    }
}


""