'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../../src/app')
const Timelog = app.service('timelogs')
const User = app.service('users')
const authentication = require('feathers-authentication/client')
const bodyParser = require('body-parser')
var token, userId, date, timelogId

// config for app to do authentication
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(authentication())
// use http plugin
chai.use(chaiHttp)
// use should
var should = chai.should()

describe('REST timelog service', () => {
  before(done => {
    date = new Date().getTime()
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

  it('should create the timelog data', done => {
    // setup a request
    chai
      .request(app)
      // request to /store
      .post('/timelogs')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(token))
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

        res.body.should.have.property('createdAt')
        res.body.should.have.property('updatedAt')

        res.body.should.have.property('owner')
        res.body.owner.should.equal(userId)

        res.body.should.have.property('date')
        res.body.date.should.equal(date)

        res.body.should.have.property('description')
        res.body.description.should.equal('Something')

        res.body.should.have.property('amount')
        res.body.amount.should.equal(99.9)

        res.body.should.have.property('comment')
        res.body.comment.should.equal('Some long comment')
        done()
      })
  })

  it('should create another the timelog data', done => {
    // setup a request
    chai
      .request(app)
      // request to /store
      .post('/timelogs')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(token))
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
        res.body._id.should.not.equal(timelogId)
        done()
      })
  })

  it('should get list of timelogs', done => {
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
        res.body.total.should.equal(2)

        res.body.should.have.property('limit')
        res.body.limit.should.equal(200)

        res.body.should.have.property('skip')
        res.body.skip.should.equal(0)

        res.body.should.have.property('data')
        res.body.data.should.have.lengthOf(2)
        done()
      })
  })

  it('should get the timelog', done => {
    // setup a request
    chai
      .request(app)
      // request to /store
      .get('/timelogs/' + timelogId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(token))
      // when finished do the following
      .end((err, res) => {
        res.body._id.should.equal(timelogId)
        done()
      })
  })

  it('should update the timelog', done => {
    // setup a request
    chai
      .request(app)
      // request to /store
      .patch('/timelogs/' + timelogId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(token))
      // attach data to request
      .send({
        amount: 9.9,
      })
      // when finished do the following
      .end((err, res) => {
        res.body.should.have.property('description')
        res.body.description.should.equal('Something')

        res.body.should.have.property('amount')
        res.body.amount.should.equal(9.9)
        done()
      })
  })

  it('should delete the timelog', done => {
    // setup a request
    chai
      .request(app)
      // request to /store
      .delete('/timelogs/' + timelogId)
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '.concat(token))
      // when finished do the following
      .end((err, res) => {
        res.statusCode.should.equal(200)
        done()
      })
  })

  it('should now only give single timelog', done => {
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

        res.body.should.have.property('data')
        res.body.data.should.have.lengthOf(1)
        done()
      })
  })
})
