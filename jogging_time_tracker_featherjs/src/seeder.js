const faker = require('faker')
const moment = require('moment')
const _ = require('lodash')

let count = 0

function generateEmails() {
  let users = ['admin', 'manager', 'user1', 'user2']
  let email = users[count] + '@test.com'
  count += 1
  return email
}

function generateRoles() {
  let roles = ['admin', 'manager']
  return [roles[count]]
}

function removeAll(app) {
  let Timelog = app.service('timelogs')
  let User = app.service('users')
  Timelog.remove(null, () => {
    User.remove(null, () => {
      createUser(app)
    })
  })
}

function createUser(app) {
  for (var i = 0; i < 4; i++) {
    app
      .service('users')
      .create({
        roles: generateRoles(),
        email: generateEmails(),
        password: '123456',
      })
      .then(user => {
        createTimelogsForUser(user._id, app)
      })
  }
}

const genDate = () => {
  const day = Math.round(Math.random() * 30)
  const seconds = Math.round(Math.random() * 60)
  const date = moment().subtract(day, 'days').subtract(seconds, 'seconds')
  return date.toISOString()
}

const genDistance = () => _.round(Math.random() * 10000, 2)
const genDuration = () => _.round(Math.random() * 1000, 2)

function generateRandomDateFromPastMonth() {
  let millisecForAMonth = 1000 * 60 * 60 * 24 * 30
  let millisecDiff = Math.round(millisecForAMonth * Math.random())
  return moment(moment().valueOf() - millisecDiff).toDate()
}

function createTimelogsForUser(userId, app) {
  for (var i = 0; i < 10; i++) {
    app.service('timelogs').create({
      owner: userId,
      date: genDate(),
      distance: genDistance(),
      duration: genDuration(),
    })
  }
}

function seed(app) {
  removeAll(app)
}

module.exports = seed
