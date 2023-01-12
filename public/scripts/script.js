import Ball from './ball.js'
import Paddle from './paddle.js'

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
let width = 500
let height = 700

// Paddle
let paddleHeight = 10
let paddleWidth = 50
let paddleDiff = 25
let paddleX = [225, 225]

let ball = new Ball(context)

let bottomPaddle = new Paddle(context, height - 20)
let topPaddle = new Paddle(context, 10)

function createCanvas () {
  canvas.id = 'canvas'
  canvas.width = width
  canvas.height = height
  document.body.appendChild(canvas)
  renderCanvas()
}

function renderCanvas () {
  context.fillStyle = 'black'
  context.fillRect(0, 0, width, height)

  //   context.fillStyle = 'white'
  //   context.fillRect(paddleX[0], height - 20, paddleWidth, paddleHeight) // Bottom paddle
  //   context.fillRect(paddleX[1], 10, paddleWidth, paddleHeight) // Up Paddle

  bottomPaddle.paint()
  topPaddle.paint()

  // Dashed Line

  context.beginPath()
  context.setLineDash([4])
  context.moveTo(0, 350)
  context.lineTo(500, 350)
  context.strokeStyle = 'grey'
  context.stroke()

  ball.paint()
}

function animate () {
  renderCanvas()
  ball.update(
    height,
    paddleDiff,
    [bottomPaddle.position, topPaddle.position],
    [bottomPaddle.y, topPaddle.y],
    paddleWidth,
    width,
    paddleHeight
  )
  topPaddle.auto(ball.x)
  window.requestAnimationFrame(animate)
}

function startGame () {
  createCanvas()
  ball.reset(height, width)
  animate()
}

// On Load
startGame()
