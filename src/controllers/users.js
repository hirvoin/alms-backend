const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {
    const { body } = request

    console.log(body)

    if (body.password.length < 6 || body.username.length < 3) {
      return response
        .status(400)
        .json({ error: 'credential requirements not fulfilled ' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      passwordHash,
    })

    console.log(user)
    const savedUser = await user.save()

    return response.status(201).json(savedUser)
  } catch (exception) {
    console.log(exception)
    return response.status(400).json({ error: 'something went wrong' })
  }
})

module.exports = usersRouter
