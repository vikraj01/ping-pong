const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
let width = 500
let height = 700


// Paddle
let paddleHeight = 10
let paddleWidth = 50
let paddleDiff = 25
let paddleX = [225, 225]

const ball = new Ball()

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

  context.fillStyle = 'white'
  context.fillRect(paddleX[0], height - 20, paddleWidth, paddleHeight) // Bottom paddle
  context.fillRect(paddleX[1], 10, paddleWidth, paddleHeight) // Up Paddle

  // Dashed Line
  context.beginPath()
  context.setLineDash([4])
  context.moveTo(0, 350)
  context.lineTo(500, 350)
  context.strokeStyle = 'grey'
  context.stroke()


  // Draw Ball
  context.beginPath()
  context.arc(ballX, ballY, ballRadius, 2 * Math.PI, false)
  context.fillStyle = 'white'
  context.fill()
}

function ballReset () {
  ballX = width / 2
  ballY = height / 2
  ballDirection = { x: 0 }
  while (Math.abs(ballDirection.x <= 0.2 || ballDirection.x >= 0.9)) {
    const heading = randomNumberBetween(0, 2 * Math.PI)
    ballDirection = { x: Math.cos(heading), y: Math.sin(heading) }
  }
  velocity = INITIAL_VELOCITY
  console.log(velocity, ballDirection, ballX, ballY)
}

function ballUpdate () {
  ballX += ballDirection.x * velocity
  ballY += ballDirection.y * velocity
  if (ballX < 0 || ballX > width) {
    console.log(ballX)
    ballDirection.x *= -1
  }

  if (ballY > height - paddleDiff || ballY < paddleDiff) {
    if (
      (ballX >= paddleX[0] && ballX <= paddleX[0] + paddleWidth) ||
      (ballX >= paddleX[1] && ballX <= paddleX[1] + paddleWidth)
    ) {
      ballDirection.y *= -1
    } else {
      ballReset()
    }
  }
}

function randomNumberBetween (min, max) {
  return Math.random() * (max - min) + min
}

// Called Every Frame
function animate () {
  renderCanvas()
  ballUpdate()
  window.requestAnimationFrame(animate)
}

// Start Game, Reset Everything
function startGame () {
  ballReset()
  createCanvas()
  animate()
}

// On Load
startGame()
