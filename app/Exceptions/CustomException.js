'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class CustomException extends LogicalException {
  handle (error, { response }) {
    response.status(error.status).json({error})
  }
}

module.exports = CustomException
