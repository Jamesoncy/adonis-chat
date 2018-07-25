'use strict'
const User = use('App/Models/User')
const Hash = use('Hash')


class UserController {
   
    async login ({ request, auth, response }) {
        const { email, password } = request.body
        let check = await auth.attempt(email, password)
        response.json({ test: 'test', check }) // 'Logged in successfully'
    }

    async show ({ auth, params, response }) {
        if (auth.user.id !== Number(params.id)) {
          response.status(400).json({ message: 'invalid' })
        } else {
          response.status(400).json({ user: auth.user })
        }
    }

    async create({ request, response }) {
        let userData  = request.only(['username', 'email', 'password'])
        
        userData.password = await Hash.make(userData.password)

        const result = await User.create(userData)
        
        response.status(201).json({ result })
    }

    async logout({ auth, request, response }) {
        const result = await auth.logout()
        response.json({ result })
    }
}

module.exports = UserController
