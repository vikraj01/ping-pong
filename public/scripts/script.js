import Ball from './ball.js'
import Paddle from './paddle.js'
import {
  BOTTOM_PADDLE_HEIGHT,
  HEIGHT,
  PADDLE_WIDTH,
  TOP_PADDLE_HEIGHT,
  WIDTH
} from './constants.js';
import Game from './game.js';


const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

let ball = new Ball(context)
let bottomPaddle = new Paddle(context, BOTTOM_PADDLE_HEIGHT)
let topPaddle = new Paddle(context, TOP_PADDLE_HEIGHT)
let game = new Game(canvas, context, bottomPaddle, topPaddle, ball)




let lastTime
function animate (time) {
  if (lastTime != null) {
    const delta = time - lastTime
    game.renderCanvas()
    ball.update(delta,[bottomPaddle.position, topPaddle.position])
    topPaddle.auto(ball.x)
  }
  lastTime = time
  window.requestAnimationFrame(animate)
}




function startGame () {
  console.log('game started')
  game.createCanvas()
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
