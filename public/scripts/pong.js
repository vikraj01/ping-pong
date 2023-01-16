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
export const socket = io('/pong')

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

let ball = new Ball(context)
let bottomPaddle = new Paddle(context, BOTTOM_PADDLE_HEIGHT)
let topPaddle = new Paddle(context, TOP_PADDLE_HEIGHT)
let setup = new Setup(canvas, context, bottomPaddle, topPaddle, ball)

function animate (time) {
  if (setup.isMaster) {
    ball.move(setup.score)
    ball.boundaries([bottomPaddle.position, topPaddle.position], setup.score)
    setup.gameOver()
  }
  setup.renderCanvas()
  if (!setup.isGameOver) window.requestAnimationFrame(animate)
}

export function startGame () {
  setup.createCanvas()
  ball.reset()
  let paddle = setup.isMaster ? topPaddle : bottomPaddle
  canvas.addEventListener('mousemove', e => {
    paddle.position = e.offsetX
    if (paddle.position < 0) {
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

//------------------------------------- Game Over Logic -------------------------------------------//

socket.on('gameOver', function (winner) {
  setup.isGameOver = true
  setup.renderGameOver(winner)
})

//-------------------------------------- Socket Logic ----------------------------------------------//

socket.on('connect', () => {
  console.log('Connected as...', socket.id)
})

socket.on('startGame', function (refId, joinedPlayers) {
  setup.isMaster = socket.id === refId
  startGame()
  setup.players = joinedPlayers
}) 

socket.on('ballMove', function ({ ballX, ballY, score }) {
  ball.x = ballX
  ball.y = ballY
  setup.score.bottom = score.bottom
  setup.score.top = score.top
})

socket.on('paddleMove', function ({ position }) {
  let opponentPaddle = setup.isMaster ? bottomPaddle : topPaddle
  opponentPaddle.position = position
})
