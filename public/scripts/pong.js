import Ball from './ball.js'
import Paddle from './paddle.js'
import {
  BOTTOM_PADDLE_HEIGHT,
  HEIGHT,
  PADDLE_WIDTH,
  TOP_PADDLE_HEIGHT,
  WIDTH
} from './constants.js';
import Setup from './setup.js';


const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

let ball = new Ball(context)
let bottomPaddle = new Paddle(context, BOTTOM_PADDLE_HEIGHT)
let topPaddle = new Paddle(context, TOP_PADDLE_HEIGHT)
let setup = new Setup(canvas, context, bottomPaddle, topPaddle, ball)




let lastTime
function animate (time) {
  if (lastTime != null) {
    const delta = time - lastTime
    setup.renderCanvas()
    ball.update(delta,[bottomPaddle.position, topPaddle.position])
    topPaddle.auto(ball.x)
  }
  lastTime = time
  window.requestAnimationFrame(animate)
}




function startGame () {
  setup.createCanvas()
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


const loadGame = () => {
  setup.createCanvas()
  setup.renderIntro()
}

loadGame()


