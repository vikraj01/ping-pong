import {
  AI_PADDLE_SPEED,
  PADDLE_DIFF,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  TOP_PADDLE_HEIGHT
} from './constants.js'
export default class Paddle {
  constructor (ctx, y) {
    this.ctx = ctx
    this._x = 225
    this.y = y
  }

  get position () {
    return this._x
  }

  set position (value) {
    this._x = value
  }

  paint () {
    if (this.y === TOP_PADDLE_HEIGHT) {
      this.ctx.fillStyle = 'red'
    } else {
      this.ctx.fillStyle = 'white'
    }
    this.ctx.fillRect(this.position, this.y, PADDLE_WIDTH, PADDLE_HEIGHT)
  }

  auto (ballX) {
    if (this.position + PADDLE_DIFF < ballX) {
      this.position += AI_PADDLE_SPEED
    } else {
      this.position -= AI_PADDLE_SPEED
    }
  }
}
