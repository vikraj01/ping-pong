import {
  HEIGHT,
  WIDTH,
  PADDLE_DIFF,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  BALL_INITIAL_VELOCITY,
  BALL_RADIUS,
  PADDLE_TOLERANCE,
  BALL_VELOCITY_INCREASE
} from './constants.js'
import { socket } from './pong.js'
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
    this.ctx.arc(this.x, this.y, BALL_RADIUS, 2 * Math.PI, false)
    this.ctx.fillStyle = 'white'
    this.ctx.fill()
  }

  reset () {
    this.x = WIDTH / 2
    this.y = HEIGHT / 2
    this.direction = { x: 0 }
    while (Math.abs(this.direction.x <= 0.2 || this.direction.x >= 0.9)) {
      const heading = randomNum(0, 2 * Math.PI)
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
    }
    this.velocity = BALL_INITIAL_VELOCITY
    socket.emit('ballMove', {
      ballX: this.x,
      ballY: this.y
    })
  }

  move (score) {
    this.x += this.direction.x * this.velocity
    this.y += this.direction.y * this.velocity
    socket.emit('ballMove', {
      ballX: this.x,
      ballY: this.y,
      score: score
    })
  }

  boundaries (paddleX, score) {
    if (this.x < 0 || this.x > WIDTH) {
      this.direction.x *= -1
    }

    if (this.y > HEIGHT - PADDLE_DIFF) {
      if (
        this.x >= paddleX[0] - PADDLE_TOLERANCE &&
        this.x <= paddleX[0] + PADDLE_WIDTH + PADDLE_TOLERANCE
      ) {
        this.direction.y *= -1
        this.velocity += BALL_VELOCITY_INCREASE
        if (this.velocity > 4.5) {
          this.velocity = 4.5
        }
      } else {
        this.reset()
        score.top++
      }
    }
    if (this.y < PADDLE_DIFF) {
      if (
        this.x >= paddleX[1] - PADDLE_TOLERANCE &&
        this.x <= paddleX[1] + PADDLE_WIDTH + PADDLE_TOLERANCE
      ) {
        this.direction.y *= -1
        this.velocity += BALL_VELOCITY_INCREASE
        if (this.velocity > 4.5) {
          this.velocity = 4.5
        }
      } else {
        this.reset()
        score.bottom++
      }
    }
  }
}

function randomNum (min, max) {
  return Math.random() * (max - min) + min
}
