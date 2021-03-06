const jwt = require('jsonwebtoken')
const entryRouter = require('express').Router()
const Entry = require('../models/entry')
const User = require('../models/user')

entryRouter.get('/', async (request, response) => {
  try {
    const entries = await Entry.find({})
    return response.json(entries.map((entry) => entry.toJSON()))
  } catch (error) {
    console.log(error)
    return response.status(400).json(error)
  }
})

entryRouter.post('/', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(403)
    }

    const { body } = request
    const entry = new Entry({ ...body, extra: body.extra ? body.extra : '' })

    const savedEntry = await entry.save()
    return response.status(201).json(savedEntry)
  } catch (error) {
    console.log(error)
    return response.status(400).json(error)
  }
})

entryRouter.delete('/:id', async (request, response) => {
  try {
    await Entry.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  } catch (error) {
    console.log(error)
    return response.status(400).json(error)
  }
})

module.exports = entryRouter
