import Ball from './ball.js'
import Paddle from './paddle.js'
import {
  BOTTOM_PADDLE_HEIGHT,
  HEIGHT,
  PADDLE_WIDTH,
  TOP_PADDLE_HEIGHT,
  WIDTH
} from './constants.js'
import Setup from './setup.js'
import { socket, listen } from './socket.js'

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

let ball = new Ball(context)
let bottomPaddle = new Paddle(context, BOTTOM_PADDLE_HEIGHT)
let topPaddle = new Paddle(context, TOP_PADDLE_HEIGHT)
let setup = new Setup(canvas, context, bottomPaddle, topPaddle, ball)

function animate (time) {
  if (setup.isMaster) {
    ball.move()
    ball.boundaries([bottomPaddle.position, topPaddle.position])
  }
  setup.renderCanvas()
  window.requestAnimationFrame(animate)
}

export function startGame () {
  setup.createCanvas()
  ball.reset()

  let paddle
  if (setup.isMaster) {
    console.log(setup.isMaster, 'top paddle')
    paddle = topPaddle
  } else {
    console.log(setup.isMaster, 'bottom paddle')
    paddle = bottomPaddle
  }

  canvas.addEventListener('mousemove', e => {
    paddle.position = e.offsetX

    if (paddle.position < 0) {
      console.log(`paddle.position < 0 ${paddle.position < 0}`)
      paddle.position = 0
    }
    if (paddle.position > WIDTH - PADDLE_WIDTH) {
      paddle.position = WIDTH - PADDLE_WIDTH
    }
    socket.emit('paddleMove', {
      position: paddle.position
    })
  })
  animate()
}

const loadGame = () => {
  setup.createCanvas()
  setup.renderIntro()
  socket.emit('ready', JSON.parse(localStorage.getItem('room-details')))
}

loadGame()
listen()

socket.on('startGame', (refId, joinedPlayers) => {
  setup.isMaster = socket.id === refId
  startGame()
  console.log('refree id is ', refId)
  console.log(setup.isMaster)
  console.log(refId, socket.id)
})

socket.on('ballMove', function ({ ballX, ballY, dir }) {
  ball.x = ballX
  ball.y = ballY
})

socket.on('paddleMove', ({ position }) => {
  let opponentPaddle
  if (setup.isMaster) {
    opponentPaddle = bottomPaddle
  } else {
    opponentPaddle = topPaddle
  }

  opponentPaddle.position = position
})
