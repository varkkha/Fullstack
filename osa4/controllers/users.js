const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password || password.length < 3) {
    return response.status(400).json({
      error: 'password missing or less than 3 characters long'
    })
  }

  if (!username || username.length < 3) {
    return response.status(400).json({
      error: 'username missing or less than 3 characters long'
    })
  }

  const notUnique = await User.findOne({ username })
  if (notUnique) {
    return response.status(400).json({
      error: 'expected `username` to be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate('blogs')
    response.json(users)
  })

module.exports = usersRouter