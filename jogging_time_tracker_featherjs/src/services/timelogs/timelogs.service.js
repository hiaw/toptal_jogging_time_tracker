// Initializes the `timelogs` service on path `/timelogs`
const createService = require('feathers-nedb');
const createModel = require('../../models/timelogs.model');
const hooks = require('./timelogs.hooks');
const filters = require('./timelogs.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'timelogs',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/timelogs', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('timelogs');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
