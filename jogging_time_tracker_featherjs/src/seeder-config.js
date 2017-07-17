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

module.exports = {
  delete: true,
  services: [
    {
      count: 10,
      path: 'timelogs',
      template: {
        date: genDate,
        distance: genDistance,
        duration: genDuration,
      },
    },
  ],
}
