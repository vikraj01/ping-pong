const playerData = new Map()
function listen (io) {
  const pongNamespace = io.of('/pong')
  pongNamespace.on('connection', socket => {
    console.log('client connected...', socket.id)
    let roomId
    socket.on('ready', data => {
      roomId = data.room
      const room = pongNamespace.adapter.rooms.get(data.room)
      if (room) {
        if (room.size < 2) {
          socket.join(data.room)
          pongNamespace.in(data.room).emit('startGame', socket.id, {
            bottom: playerData.get(data.room).player1,
            top: data.player
          })
        } else {
          pongNamespace.in(data.room).emit('exitGame')
        }
      } else {
        socket.data.room = data.room
        playerData.set(data.room, { player1: data.player })
        socket.join(data.room)
      }
    })

    socket.on('paddleMove', position => {
      socket.to(roomId).emit('paddleMove', position)
    })

    socket.on('ballMove', ballData => {
      socket.to(roomId).emit('ballMove', ballData)
    })

    socket.on('gameOver', winner => {
      pongNamespace.in(roomId).emit('gameOver', winner)
    })

    socket.on('disconnect', reason => {
      console.log(`Client ${socket.id} disconnected: ${reason}`)
      socket.leave(roomId)
    })
  })
}

module.exports = {
  listen
}
