'use strict'

const path = require('path')
const NeDB = require('nedb')
const service = require('feathers-nedb')
const hooks = require('./hooks')

module.exports = function() {
  const app = this

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'timelogs.db'),
    autoload: true,
  })

  let options = {
    Model: db,
    paginate: {
      default: 200,
      max: 250,
    },
  }

  // Initialize our service with any options it requires
  app.use('/timelogs', service(options))

  // Get our initialize service to that we can bind hooks
  const timelogService = app.service('/timelogs')

  // Set up our before hooks
  timelogService.before(hooks.before)

  // Set up our after hooks
  timelogService.after(hooks.after)
}
