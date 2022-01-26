

class Ball {
    constructor(ctx, boardWidth, boardHeight, leftPaddle, rightPaddle) {
        this.ctx = ctx;
        this.width = boardWidth;
        this.height = boardHeight;
        this.position = [this.width / 2, this.height / 2];
        this.radius = 1;
        this.velocity = [1, 1];
        this.leftPaddle = leftPaddle;
        this.rightPaddle = rightPaddle;
    }

    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.position[0], this.position[1], this.radius, 0.2* Math.PI, false);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
    }

    initialPosition() {
        this.position = [this.width / 2, this.height / 2];
    }

    move() {
        if (this.onTopOrBottomWall()) this.velocity[1] = -this.velocity[1];
        if (this.onSideWalls()) this.velocity[0] = -this.velocity[0];
        if (this.onPaddleLeft()) this.velocity[0] = -this.velocity[0];
        if (this.onPaddleRight()) this.velocity[0] = -this.velocity[0];

        this.position[0] += this.velocity[0];
        this.position[1] += this.velocity[1];
    }

    onTopOrBottomWall() {
        return this.position[1] === this.radius
            || this.position[1] === this.height - this.radius;
    }

    onSideWalls() {
        if (this.position[0] === this.radius) {
            this.rightPaddle.points++;
            this.lightCanvas('right');
            return true;
        } else if (this.position[0] === this.width - this.radius) {
            this.leftPaddle.points++;
            this.lightCanvas('left');
            return true;
        }
    }

    onPaddleLeft() {
        let onVerticalRange =
            this.position[1] - this.radius < this.leftPaddle.position[1] + this.leftPaddle.height
            && this.position[1] + this.radius > this.leftPaddle.position[1];
        let onHorizontalRange =
            this.position[0] - this.radius === this.leftPaddle.position[0] + this.leftPaddle.width;

        return onVerticalRange && onHorizontalRange && this.velocity[0] < 0;
    }

    onPaddleRight() {
        let onVerticalRange =
            this.position[1] - this.radius < this.rightPaddle.position[1] + this.rightPaddle.height
            && this.position[1] + this.radius > this.rightPaddle.position[1];
        let onHorizontalRange =
            this.position[0] + this.radius === this.rightPaddle.position[0];

        return onVerticalRange && onHorizontalRange && this.velocity[0] > 0;
    }

    lightCanvas(side) {
        let lightIt = () => {
            this.ctx.fillStyle = '#f00';
            side === 'left'
                ? this.ctx.fillRect(0, 0, this.width / 2, this.height)
                : this.ctx.fillRect(this.width / 2, 0, this.width, this.height);
        };

        lightIt();
        let interval = setInterval(lightIt, 25);
        setTimeout(clearInterval.bind(null, interval), 100);
    }
}

