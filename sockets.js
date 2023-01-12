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
          // Get player data for both players from playerData map
          const players = [playerData.get(data.room).player1, data.player]
          console.log(players)
          socket.join(data.room)
          
          pongNamespace.in(data.room).emit('startGame', socket.id, players)
        } else {
          pongNamespace.in(data.room).emit('exitGame')
        }
      } else {
        // Store player data in playerData map
        socket.data.room = data.room
        playerData.set(data.room, { player1: data.player })
        socket.join(data.room)
      }
    })

    socket.on('paddleMove', paddleData => {
      console.log(paddleData)
      socket.to(roomId).emit('paddleMove', paddleData)
    })

    socket.on('ballMove', ballData => {
      socket.to(roomId).emit('ballMove', ballData)
    })

    socket.on('gameOver', winner => {
      console.log('Game Over')
      pongNamespace.in(roomId).emit('gameOver', winner)
    })

    socket.on('disconnect', reason => {
      console.log(`Client ${socket.id} disconnected: ${reason}`)
      socket.leave(roomId)
    })

    socket.on('exit-game',(socketId) => {
      socket.to(roomId).emit('hardTest')
      pongNamespace.in(roomId).emit('test')
      pongNamespace.in(roomId).emit('exit-game')
      console.log('exit-game')
      console.log(socketId)
      socket.disconnect();
    })
  })
}

module.exports = {
  listen
}
