const assert = require('assert');
const app = require('../../src/app');

describe('\'timelogs\' service', () => {
  it('registered the service', () => {
    const service = app.service('timelogs');

    assert.ok(service, 'Registered the service');
  });
});
