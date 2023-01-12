import Ball from './ball.js'
import Paddle from './paddle.js'
import {
  BOTTOM_PADDLE_HEIGHT,
  HEIGHT,
  PADDLE_WIDTH,
  TOP_PADDLE_HEIGHT,
  WIDTH
} from './constants.js'

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

let ball = new Ball(context)

let bottomPaddle = new Paddle(context, BOTTOM_PADDLE_HEIGHT)
let topPaddle = new Paddle(context, TOP_PADDLE_HEIGHT)

function createCanvas () {
  canvas.id = 'canvas'
  canvas.width = WIDTH
  canvas.height = HEIGHT
  document.body.appendChild(canvas)
  renderCanvas()
}

function renderCanvas () {
  context.fillStyle = 'black'
  context.fillRect(0, 0, WIDTH, HEIGHT)

  bottomPaddle.paint()
  topPaddle.paint()

  context.beginPath()
  context.setLineDash([4])
  context.moveTo(0, 350)
  context.lineTo(500, 350)
  context.strokeStyle = 'grey'
  context.stroke()

  ball.paint()
}

let lastTime
function animate (time) {
  if (lastTime != null) {
    const delta = time - lastTime
    console.log(delta)
    renderCanvas()
    ball.update([bottomPaddle.position, topPaddle.position])
    topPaddle.auto(ball.x)
  }
  lastTime = time
  window.requestAnimationFrame(animate)
}

function startGame () {
  createCanvas()
  ball.reset()
  canvas.addEventListener('mousemove', e => {
    bottomPaddle.position = e.offsetX

    if (bottomPaddle.position < 0) {
      console.log(`bottomPaddle.position < 0 ${bottomPaddle.position < 0}`)
      bottomPaddle.position = 0
    }
    if (bottomPaddle.position > WIDTH - PADDLE_WIDTH) {
      bottomPaddle.position = WIDTH - PADDLE_WIDTH
    }
  })
  animate()
}

startGame()
