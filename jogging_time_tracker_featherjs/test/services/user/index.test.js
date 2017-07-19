'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = require('assert')
const app = require('../../../src/app')
const Timelog = app.service('timelogs')
const User = app.service('users')
const authentication = require('feathers-authentication/client')
const bodyParser = require('body-parser')
var token, userId

// config for app to do authentication
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(authentication())
// use http plugin
chai.use(chaiHttp)

describe('user service', function() {
  before(done => {
    // start the server
    this.server = app.listen(3030)
    // once listening do the following
    this.server.once('listening', () => {
      // create mock user
      User.create(
        {
          email: 'resposadmin',
          password: 'igzSwi7*Creif4V$',
          roles: ['admin'],
        },
        res => {
          // setup a request to get authentication token
          chai
            .request(app)
            // request to /auth/local
            .post('/auth/local')
            // set header
            .set('Accept', 'application/json')
            // send credentials
            .send({
              email: 'resposadmin',
              password: 'igzSwi7*Creif4V$',
            })
            // when finished
            .end((err, res) => {
              // set token for auth in other requests
              token = res.body.token
              userId = res.body.data._id
              done()
            })
        },
      )
    })
  })

  // teardown after tests
  after(done => {
    // delete contents of menu in mongodb
    User.remove(null, () => {
      // stop the server
      this.server.close(function() {})
      done()
    })
  })

  it('registered the users service', () => {
    assert.ok(app.service('users'))
  })

  it('runs create', done => {
    app
      .service('users')
      .create({
        email: 'some@email.com',
        password: 'somepassword',
      })
      .then(user => {
        assert.ok(user._id)
        assert.ok(user.createdAt)
        assert.equal(user.email, 'some@email.com')
        done()
      })
  })
})
