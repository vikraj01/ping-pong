let paddleHeight = 10
let paddleWidth = 50
let paddleDiff = 25
const SPEED = 2
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
    this.ctx.fillStyle = 'white'

    this.ctx.fillRect(this.position, this.y, paddleWidth, paddleHeight)
  }

  auto (ballX) {
    if (this.position + paddleDiff < ballX) {
      this.position += SPEED
    } else {
      this.position -= SPEED
    }
  }
}
