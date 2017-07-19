const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = require('assert')
const app = require('../../../src/app')
const Timelog = app.service('timelogs')
const User = app.service('users')
const authentication = require('feathers-authentication/client')
const bodyParser = require('body-parser')
var token, userToken, userId, date, timelogId

// config for app to do authentication
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(authentication())
// use http plugin
chai.use(chaiHttp)
// use should
var should = chai.should()

function createAdminUser(done) {
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
          done()
        })
    },
  )
}

describe('REST as Admin timelog list service', () => {
  before(done => {
    date = new Date().getTime()
    // start the server
    this.server = app.listen(3030)
    // once listening do the following
    this.server.once('listening', () => {
      // create mock user
      User.create(
        {
          email: 'user@user.com',
          password: 'igzSwi7*Creif4V$',
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
              email: 'user@user.com',
              password: 'igzSwi7*Creif4V$',
            })
            // when finished
            .end((err, res) => {
              // set token for auth in other requests
              userId = res.body.data._id
              userToken = res.body.token
              createAdminUser(done)
            })
        },
      )
    })
  })

  // teardown after tests
  after(done => {
    // delete contents of menu in mongodb
    Timelog.remove(null, () => {
      User.remove(null, () => {
        // stop the server
        this.server.close(function() {})
        done()
      })
    })
  })

  it('should create an timelog data', done => {
    // setup a request
    chai
      .request(app)
      // request to /store
      .post('/timelogs')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(userToken))
      // attach data to request
      .send({
        owner: userId,
        date: date,
        description: 'Something',
        amount: 99.9,
        comment: 'Some long comment',
      })
      // when finished do the following
      .end((err, res) => {
        timelogId = res.body._id
        res.body.date.should.equal(date)
        done()
      })
  })

  it('user should get list of timelogs', done => {
    // setup a request
    chai
      .request(app)
      // request to /store
      .get('/timelogs')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(userToken))
      // when finished do the following
      .end((err, res) => {
        res.body.should.have.property('total')
        res.body.total.should.equal(1)
        done()
      })
  })

  it('admin should get list of timelogs', done => {
    // setup a request
    chai
      .request(app)
      // request to /store
      .get('/timelogs')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(token))
      // when finished do the following
      .end((err, res) => {
        res.body.should.have.property('total')
        res.body.total.should.equal(1)
        done()
      })
  })
})
