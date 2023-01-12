import { HEIGHT, WIDTH } from './constants'
export default class Game {
  constructor (canvas, context, bottomPaddle, topPaddle, ball) {
    this.canvas = canvas
    this.context = context
    this.bottomPaddle = bottomPaddle
    this.topPaddle = topPaddle
    this.ball = ball
  }
  createCanvas () {
    this.canvas.id = 'canvas'
    this.canvas.width = WIDTH
    this.canvas.height = HEIGHT
    document.body.appendChild(this.canvas)
    this.renderCanvas()
  }
  dashedLine () {
    this.context.beginPath()
    this.context.setLineDash([4])
    this.context.moveTo(0, 350)
    this.context.lineTo(500, 350)
    this.context.strokeStyle = 'grey'
    this.context.stroke()
  }



  renderCanvas () {
    this.context.fillStyle = 'black'
    this.context.fillRect(0, 0, WIDTH, HEIGHT)
    this.bottomPaddle.paint()
    this.topPaddle.paint()
    this.dashedLine()
    this.ball.paint()
  }
}
