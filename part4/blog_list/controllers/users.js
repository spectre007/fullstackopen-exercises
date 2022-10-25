const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  const existingUser = await User.findOne({ username })


  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  } else if (!password) {
    return response.status(400).json({
      error: 'password is required'
    })
  } else if (password.length < 3) {
    return response.status(400).json({
      error: 'password must be at least three characters long'
    })
  }
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
