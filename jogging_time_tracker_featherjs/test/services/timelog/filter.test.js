'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
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
// use should
var should = chai.should()

function createSampleData() {
  Timelog.create({
    owner: userId,
    date: new Date(2000, 1, 1).getTime(),
    description: 'A',
    amount: 1,
    comment: 'Some long comment',
  })
  Timelog.create({
    owner: userId,
    date: new Date(2002, 2, 2).getTime(),
    description: 'BBBBBBBbbbb',
    amount: 20.99,
  })
  Timelog.create({
    owner: userId,
    date: new Date(2005, 5, 5).getTime(),
    description: 'LLLLllllllll',
    amount: 50,
    comment: 'Some long comment',
  })
  Timelog.create({
    owner: userId,
    date: new Date(2008, 8, 8).getTime(),
    description: 'OOOOoooooo',
    amount: 80,
  })
  Timelog.create({
    owner: userId,
    date: new Date(2010, 10, 10).getTime(),
    description: 'ZZZZzzzzz',
    amount: 100,
  })
}

describe('filter timelog service', () => {
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
              createSampleData()
              done()
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

  it('should get list of timelogs', done => {
    app.service('timelogs').find().then(timelog => {
      timelog.total.should.equal(5)
      done()
    })
  })

  it('should filter by description', done => {
    app
      .service('timelogs')
      .find({
        query: {
          description: {
            $ne: 'A',
          },
        },
      })
      .then(timelog => {
        timelog.total.should.equal(4)
        done()
      })
  })

  it('should filter by amount', done => {
    app
      .service('timelogs')
      .find({
        query: {
          amount: {
            $lt: 21,
          },
        },
      })
      .then(timelog => {
        timelog.total.should.equal(2)
        done()
      })
  })

  it('should limit results', done => {
    app
      .service('timelogs')
      .find({
        query: {
          $limit: 2,
        },
      })
      .then(timelog => {
        timelog.data.should.have.lengthOf(2)
        done()
      })
  })

  it('should filter by date', done => {
    app
      .service('timelogs')
      .find({
        query: {
          date: {
            $lt: new Date(2003, 1, 1).getTime(),
          },
        },
      })
      .then(timelog => {
        timelog.total.should.equal(2)
        done()
      })
  })

  it('should filter by date', done => {
    app
      .service('timelogs')
      .find({
        query: {
          $sort: {
            date: -1,
          },
        },
      })
      .then(timelog => {
        timelog.data[0].amount.should.equal(100)
        timelog.data[4].amount.should.equal(1)
        done()
      })
  })
})
