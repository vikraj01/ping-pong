const RADIUS = 5
const INITIAL_VELOCITY = 3

export default class Ball {
  constructor (ctx) {
    this.ctx = ctx
    this._x = 250
    this._y = 350
    this.direction = { x: 0, y: 0 }
  }

  get x () {
    return this._x
  }

  set x (value) {
    this._x = value
  }

  get y () {
    return this._y
  }

  set y (value) {
    this._y = value
  }

  paint () {
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, RADIUS, 2 * Math.PI, false)
    this.ctx.fillStyle = 'white'
    this.ctx.fill()
  }

  reset (height, width) {
    this.x = width / 2
    this.y = height / 2
    this.direction = { x: 0 }
    while (Math.abs(this.direction.x <= 0.2 || this.direction.x >= 0.9)) {
      const heading = randomNum(0, 2 * Math.PI)
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
    }
    this.velocity = INITIAL_VELOCITY
  }

  update (height, paddleDiff, paddles, paddleWidth, width) {
    this.x += this.direction.x * this.velocity
    this.y += this.direction.y * this.velocity
    if (this.x < 0 || this.x > width) {
      this.direction.x *= -1
    }

    if (this.y > height - paddleDiff || this.y < paddleDiff) {
      console.log(
        (this.x >= paddles[0] && this.x <= paddles[0] + paddleWidth) ||
          (this.x >= paddles[1] && this.x <= paddles[1] + paddleWidth)
      )
      if (
        (this.x >= paddles[0] && this.x <= paddles[0] + paddleWidth) ||
        (this.x >= paddles[1] && this.x <= paddles[1] + paddleWidth)
      ) {
        this.direction.y *= -1
      } else {
        console.log('Reset', paddles, this.x, this.y)
        this.reset(height, width)
      }
    }
  }
}

function randomNum (min, max) {
  return Math.random() * (max - min) + min
}
