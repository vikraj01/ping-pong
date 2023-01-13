export const socket = io('/pong')
// import { ball } from './pong.js'
export function listen () {
  socket.on('connect', () => {
    console.log('Connected as...', socket.id)
  })

  
}
