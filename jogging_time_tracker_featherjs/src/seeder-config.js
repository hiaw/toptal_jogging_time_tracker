const moment = require('moment')
const _ = require('lodash')

const genDate = () => {
  const day = Math.round(Math.random() * 30)
  const seconds = Math.round(Math.random() * 60)
  const date = moment().subtract(day, 'days').subtract(seconds, 'seconds')
  return date.toISOString()
}

const genDistance = () => _.round(Math.random() * 10000, 2)
const genDuration = () => _.round(Math.random() * 1000, 2)

const callback = (user, seed) => {
  return seed({
    count: 10,
    path: 'timelogs',
    template: {
      date: genDate,
      distance: genDistance,
      duration: genDuration,
      ownerId: user._id,
    },
  })
}

module.exports = {
  delete: true,
  services: [
    {
      path: 'users',
      template: {
        email: 'admin@test.com',
        password: 'password',
        roles: 'admin',
      },
      callback,
    },
    {
      path: 'users',
      template: {
        email: 'manager@test.com',
        password: 'password',
        roles: 'manager',
      },
      callback,
    },
    {
      path: 'users',
      template: {
        email: 'user1@test.com',
        password: 'password',
        roles: '',
      },
      callback,
    },
    {
      path: 'users',
      template: {
        email: 'user2@test.com',
        password: 'password',
        roles: '',
      },
      callback,
    },
  ],
}
