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

  update (
    height,
    paddleDiff,
    paddleX,
    paddleY,
    paddleWidth,
    width,
    paddleHeight
  ) {
    this.x += this.direction.x * this.velocity
    this.y += this.direction.y * this.velocity
    // Bouncing off the left and right wall
    if (this.x < 0 || this.x > width) {
      this.direction.x *= -1
    }

    // if (this.y > height - paddleDiff || this.y < paddleDiff) {
    //   if (
    //     (this.x >= paddleX[0] && this.x <= paddleX[0] + paddleWidth) ||
    //     (this.x >= paddleX[1] && this.x <= paddleX[1] + paddleWidth)
    //   ) {
    //     this.direction.y *= -1
    //   } else {
    //     console.log('Reset', paddleX, this.x, this.y)
    //     this.reset(height, width)
    //   }
    // }

    // Bounce off player paddle (bottom)
    if (this.y > height - paddleDiff) {
      if (this.x >= paddleX[0] && this.x <= paddleX[0] + paddleWidth) {
        this.direction.y *= -1
        // trajectoryX[0] = ballX - (paddleX[0] + paddleDiff)
        // speedX = trajectoryX[0] * 0.3
      } else {
        // Reset Ball, add to Computer Score
        this.reset(height, width)
        // score[1]++
      }
    }
    // Bounce off computer paddle (top)
    if (this.y < paddleDiff) {
      if (this.x >= paddleX[1] && this.x <= paddleX[1] + paddleWidth) {
        this.direction.y *= -1
        // trajectoryX[1] = ballX - (paddleX[1] + paddleDiff)
        // speedX = trajectoryX[1] * 0.3
      } else {
        this.reset(height, width)
        // score[0]++
      }
    }
  }
}

function randomNum (min, max) {
  return Math.random() * (max - min) + min
}
