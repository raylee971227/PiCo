/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')

  describe('/api/users/user1', () => {
    const user1 = 'user1@email.com'

    beforeEach((() => {
      return User.create({
        email: user1
      })
    }))

    it("GET /api/users/1", async () => {
      const res = await request(app).get('/api/users/1').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(user1)
    })
  }) 
}) // end describe('User routes')
