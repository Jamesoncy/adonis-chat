'use strict'

class Websocket {
  async wsHandle ({request}, next) {
    // call next to advance the request
    // console.log(request, options, message)
    //  throw new Error('dsada')
    await next()
  }
}

module.exports = Websocket
