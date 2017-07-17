const moment = require('moment')

const genDate = () => {
  const day = Math.round(Math.random() * 30)
  const seconds = Math.round(Math.random() * 60)
  const date = moment().subtract(day, 'days').subtract(seconds, 'seconds')
  return date.toISOString()
}

module.exports = {
  delete: true,
  services: [
    {
      count: 10,
      path: 'timelogs',
      template: {
        date: genDate,
        distance: () => Math.random() * 10000,
        duration: () => Math.random() * 1000,
      },
    },
  ],
}
