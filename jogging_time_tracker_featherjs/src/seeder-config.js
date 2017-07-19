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
    delete: false,
    count: 10,
    path: 'timelogs',
    params: {
      userId: user._id,
    },
    template: {
      date: genDate,
      distance: genDistance,
      duration: genDuration,
      ownerId: user._id,
    },
  })
}

module.exports = {
  services: [
    {
      delete: true,
      randomize: false,
      path: 'users',
      templates: [
        {
          email: 'admin@test.com',
          password: 'password',
          roles: 'admin',
        },

        {
          email: 'manager@test.com',
          password: 'password',
          roles: 'manager',
        },

        {
          email: 'user1@test.com',
          password: 'password',
          roles: '',
        },

        {
          email: 'user2@test.com',
          password: 'password',
          roles: '',
        },
      ],
      callback,
    },
  ],
}
