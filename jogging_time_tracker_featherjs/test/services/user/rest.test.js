'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../../src/app')
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
// use should
var should = chai.should()

describe('REST user service', () => {
  before((done) => {
    // start the server
    this.server = app.listen(3030)
    // once listening do the following
    this.server.once('listening', () => {
      // create mock user
      User.create({
        'email': 'resposadmin',
        'password': 'igzSwi7*Creif4V$'
      }, (res) => {
        // setup a request to get authentication token
        chai.request(app)
        // request to /auth/local
          .post('/auth/local')
        // set header
          .set('Accept', 'application/json')
        // send credentials
          .send({
            'email': 'resposadmin',
            'password': 'igzSwi7*Creif4V$'
          })
        // when finished
          .end((err, res) => {
            // set token for auth in other requests
            token = res.body.token
            userId = res.body.data._id
            done()
          })
      })
    })
  })

  // teardown after tests
  after((done) => {
    // delete contents of menu in mongodb
    User.remove(null, () => {
      User.remove(null, () => {
        // stop the server
        this.server.close(function () {})
        done()
      })
    })
  })

  it('should not get list of users', (done) => {
    // setup a request
    chai.request(app)
    // request to /store
      .get('/users')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(token))
    // when finished do the following
      .end((err, res) => {
        res.statusCode.should.equal(403)
        done()
      })
  })

  it('should get the user', (done) => {
    // setup a request
    chai.request(app)
    // request to /store
      .get('/users/' + userId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(token))
    // when finished do the following
      .end((err, res) => {
        res.body._id.should.equal(userId)
        done()
      })
  })

  it('should update the user', (done) => {
    // setup a request
    chai.request(app)
    // request to /store
      .patch('/users/' + userId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(token))
    // attach data to request
      .send({
        email: 'new@email.com'
      })
    // when finished do the following
      .end((err, res) => {
        res.body.should.have.property('email')
        res.body.should.have.property('updatedAt')
        res.body.email.should.equal('new@email.com')
        done()
      })
  })

  it('should delete the user', (done) => {
    // setup a request
    chai.request(app)
    // request to /store
      .delete('/users/' + userId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(token))
    // when finished do the following
      .end((err, res) => {
        res.statusCode.should.equal(200)
        done()
      })
  })
})
