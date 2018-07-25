'use strict'
const User = use('App/Models/User')

class Login {
  async handle ({ request }, next) {
    const user = await User.all()
    request.user = user
    // call next to advance the request
    await next()
  }
  async wsHandle ({ request }, next) {
    // call next to advance the request
    await next()
  }
}

module.exports = Login
