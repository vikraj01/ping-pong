import { HEIGHT, WIDTH, WINNING_SCORE } from './constants.js'
import { socket } from './pong.js'
export default class Setup {
  constructor (canvas, context, bottomPaddle, topPaddle, ball) {
    this.canvas = canvas
    this.context = context
    this.bottomPaddle = bottomPaddle
    this.topPaddle = topPaddle
    this.ball = ball
    this.isMaster = false
    this.players = null
    this.score = { bottom: 0, top: 0 }
    this.isGameOver = false
  }

  gameOver () {
    if (
      this.score.top === WINNING_SCORE ||
      this.score.bottom === WINNING_SCORE
    ) {
      const winner =
        this.score.top === WINNING_SCORE
          ? { winner: this.players.top, paddle: 'TOP', loser: this.players.bottom }
          : {
              winner: this.players.bottom,
              paddle: 'BOTTOM',
              loser: this.players.top
            }
      socket.emit('gameOver', winner)
    }
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

  renderPlayerAndScore () {
    this.context.font = '32px Courier New'
    this.context.textAlign = 'start'
    this.context.fillText(this.score.bottom, 20, this.canvas.height / 2 + 50)
    this.context.fillText(this.score.top, 20, this.canvas.height / 2 - 30)
    this.context.font = '16px Courier New'
    this.context.fillStyle = '#fff'
    this.context.textAlign = 'right'
    this.context.fillText(
      this.players?.bottom,
      canvas.width - 10,
      canvas.height / 2 + 30
    )
    this.context.fillText(
      this.players?.top,
      canvas.width - 10,
      canvas.height / 2 - 30
    )
    this.context.textAlign = 'start'
  }

  renderCanvas () {
    this.context.fillStyle = 'black'
    this.context.fillRect(0, 0, WIDTH, HEIGHT)
    this.bottomPaddle.paint()
    this.topPaddle.paint()
    this.dashedLine()
    this.renderPlayerAndScore()
    this.ball.paint()
  }

  renderIntro () {
    this.context.fillStyle = 'rgb(70, 70, 70)'
    this.context.fillRect(0, 0, WIDTH, HEIGHT)

    const { room, player } = JSON.parse(localStorage.getItem('room-details'))
    this.context.fillStyle = 'white'
    this.context.font = '32px Lato'

    this.context.fillText(
      `Welcome to the pong game 🏓`,
      40,
      this.canvas.height / 2 - 90
    )
    this.context.fillText(`🚪 Room : ${room}`, 20, this.canvas.height / 2 - 30)
    this.context.fillText(
      `🏌️ Player : ${player}`,
      20,
      this.canvas.height / 2 + 30
    )
    this.context.font = '24px Lato'
    this.context.fillText(
      ` Waiting For Your Opponent To Join ...`,
      40,
      this.canvas.height / 2 + 180
    )
  }

  renderWinner (winner) {
    this.context.font = '40px Lato'
    this.context.fillText(
      `Congrats ${winner}! You Win 🍻`,
      30,
      this.canvas.height / 2 - 90
    )
  }

  renderLoser (loser) {
    this.context.font = '40px Lato'
    this.context.fillText(
      `Sorry ${loser}! You lost`,
      30,
      this.canvas.height / 2 - 90
    )
    this.context.fillText(
      `Better Luck next time🍻`,
      30,
      this.canvas.height / 2 - 30
    )
  }
  
  renderGameOver (result) {
    this.context.fillStyle = 'rgb(70, 70, 70)'
    this.context.fillRect(0, 0, WIDTH, HEIGHT)
    this.context.fillStyle = 'white'
    if (result.paddle === 'TOP') {
      if (this.isMaster) {
        this.renderWinner(result.winner)
      } else {
        this.renderLoser(result.loser)
      }
    } else {
      if (this.isMaster) {
        this.renderLoser(result.loser)
      } else {
        this.renderWinner(result.winner)
      }
    }
  }
}
