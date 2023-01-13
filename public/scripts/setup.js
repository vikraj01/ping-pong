import { HEIGHT, WIDTH } from './constants.js'
export default class Setup {
  constructor (canvas, context, bottomPaddle, topPaddle, ball) {
    this.canvas = canvas
    this.context = context
    this.bottomPaddle = bottomPaddle
    this.topPaddle = topPaddle
    this.ball = ball
    this.isMaster = false;
    this.player = null;
    this.score = 0;
  }
  createCanvas () {
    console.log('createCanvas', this.canvas)
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

  renderIntro () {
    this.context.fillStyle = 'rgb(70, 70, 70)'
    this.context.fillRect(0, 0, WIDTH, HEIGHT)
    

    const roomId = '7383873g9d898e'
    this.context.fillStyle = 'white'
    this.context.font = '32px Lato'
    
    this.context.fillText(`Welcome to the pong game 🏓`, 40, this.canvas.height / 2 - 90)
    this.context.fillText(`🚪 Room : ${roomId}`, 20, this.canvas.height / 2 - 30)
    this.context.fillText(`🏌️ Player : Sol`, 20, this.canvas.height / 2 + 30)
    this.context.font = '24px Lato'
    this.context.fillText(` Waiting For Your Opponent To Join ...`, 40, this.canvas.height / 2 + 180)
  }
  renderGameOver () {
    this.context.fillStyle = 'rgb(70, 70, 70)'
    this.context.fillRect(0, 0, WIDTH, HEIGHT)
  
    const roomId = '7383873g9d898e'
    this.context.fillStyle = 'white'
    this.context.font = '32px Lato'
    
    this.gameStatus = true
    if(this.gameStatus){
      this.context.font = '40px Lato'
      this.context.fillText(`Congrats Sol! You Win 🍻`, 30, this.canvas.height / 2 - 90)
      
      
    }else{
      this.context.font = '32px Lato'
      this.context.fillText(`Sorry , You loss! But No Worries, `, 30, this.canvas.height / 2 - 90)
      this.context.fillText(`You'll get it next time champ 🍻 `, 30, this.canvas.height / 2 - 30)
    }

  }
}
