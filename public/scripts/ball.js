const RADIUS = 5
const INITIAL_VELOCITY = 3

export default class Ball {
  constructor (ctx) {
    this.ctx = ctx
    this.x = 250
    this.y = 350
    this.direction = { x: 0, y: 0 }
    this.paint()
  }

  paint () {
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, RADIUS, 2 * Math.PI, false)
    this.ctx.fillStyle = 'white'
    this.ctx.fill()
  }

  reset (height, weight) {
    this.x = width / 2
    this.y = height / 2
    this.direction = { x: 0 }
    while (Math.abs(this.direction.x <= 0.2 || this.direction.x >= 0.9)) {
      const heading = randomNum(0, 2 * Math.PI)
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
    }
    this.velocity = INITIAL_VELOCITY
  }

  update (height, paddleDiff, paddleX, paddleWidth) {
    this.x += this.direction.x * this.velocity
    this.y += this.direction.y * this.velocity
    if (this.x < 0 || this.x > width) {
      this.direction.x *= -1
    }

    if (this.y > height - paddleDiff || this.y < paddleDiff) {
      if (
        (this.x >= paddleX[0] && this.x <= paddleX[0] + paddleWidth) ||
        (this.x >= paddleX[1] && this.x <= paddleX[1] + paddleWidth)
      ) {
        this.direction.y *= -1
      } else {
        this.reset()
      }
    }
  }
}

function randomNum (min, max) {
  return Math.random() * (max - min) + min
}
