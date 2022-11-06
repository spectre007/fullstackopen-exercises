const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('login for user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await helper.createUser({ username: 'root', password: 'geheim' })
  })

  test('succeeds with correct password and returns token', async () => {
    const loginDetails = {
      username: 'root',
      password: 'geheim',
    }

    result = await api
      .post('/api/login')
      .send(loginDetails)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toHaveProperty('token')
    expect(result.body).toHaveProperty('username')
  })

  test('fails with statuscode if password is wrong', async () => {
    const loginDetails = {
      username: 'root',
      password: 'wrongPassword',
    }

    result = await api
      .post('/api/login')
      .send(loginDetails)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('invalid username or password')
  })
})
