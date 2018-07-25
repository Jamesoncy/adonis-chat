'use strict'
const CustomException = use('App/Exceptions/CustomException')

class Email {
  async handle ({ request, auth }, next) {
    // call next to advance the request
    if (auth.user.id != 2) {
      throw new CustomException('Not authorized', 401)
    } 
    await next()
  }
  async wsHandle ({ request }, next) {
    // call next to advance the request
    await next()
  }
}

module.exports = Email
