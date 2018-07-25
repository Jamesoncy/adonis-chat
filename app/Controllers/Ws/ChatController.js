'use strict'

class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage(message) {
   // this.socket.broadcastToAll('message', message)
   // this.socket.emitTo('message', message, [this.socket.id])
   this.socket.emitTo('error', 'error', [this.socket.id])
   // throw new Error('dsada')
   // this.socket.broadcast('message', message)
  }

  onClose() {
    console.log('close')
    this.socket.close()
  }

  onError(message) { 
    console.log('err tlga')
  }
}

module.exports = ChatController
