const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('POST /api/users', () => {
  test('creation succeeds with valid data', async () => {
    const newUser = { username: 'root', name: 'Root', password: 'salainen' }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('fails with 400 if username is missing', async () => {
    const response = await api
      .post('/api/users')
      .send({ name: 'No Username', password: 'salainen' })
      .expect(400)

    assert.ok(response.body.error)
  })

  test('fails with 400 if username is too short', async () => {
    const response = await api
      .post('/api/users')
      .send({ username: 'ab', name: 'Short', password: 'salainen' })
      .expect(400)

    assert.ok(response.body.error)
  })

  test('fails with 400 if password is missing', async () => {
    const response = await api
      .post('/api/users')
      .send({ username: 'validuser', name: 'No Password' })
      .expect(400)

    assert.ok(response.body.error)
  })

  test('fails with 400 if password is too short', async () => {
    const response = await api
      .post('/api/users')
      .send({ username: 'validuser', name: 'Short Pass', password: 'ab' })
      .expect(400)

    assert.ok(response.body.error)
  })

  test('fails with 400 if username is already taken', async () => {
    const user = { username: 'root', name: 'Root', password: 'salainen' }
    await api.post('/api/users').send(user).expect(201)

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    assert.ok(response.body.error)
  })
})

after(async () => {
  await mongoose.connection.close()
})
