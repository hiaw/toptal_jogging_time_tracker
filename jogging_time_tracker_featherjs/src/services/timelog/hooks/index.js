'use strict'

const globalHooks = require('../../../hooks')
const hooks = require('feathers-hooks')
const commonHooks = require('feathers-hooks-common')
const auth = require('feathers-authentication').hooks

var defaults = {
  idField: '_id',
  as: 'owner'
}

const myHook = options => { // always wrap in a function so you can pass options and for consistency.
  return hook => {
    // Should only query with current user
    if (hook.params.user && hook.params.user.roles && hook.params.user.roles.indexOf('admin') >= 0) {
    } else {
      if (hook.type !== 'before') {
        throw new Error('The \'queryWithCurrentUser\' hook should only be used as a \'before\' hook.')
      }

      if (!hook.params.user) {
        if (!hook.params.provider) {
          return hook
        }

        throw new Error('There is no current user to associate.')
      }

      options = Object.assign({}, defaults, hook.app.get('auth'), options)

      var id = hook.params.user[options.idField]

      if (id === undefined) {
        throw new Error('Current user is missing \'' + options.idField + '\' field.')
      }

      hook.params.query[options.as] = id
    }

    return Promise.resolve(hook) // A good convention is to always return a promise.
  }
}

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [
    myHook()
  ],
  get: [
    auth.restrictToRoles({
      roles: ['admin'],
      ownerField: 'owner',
      owner: true
    })
  ],
  create: [
    commonHooks.setCreatedAt('createdAt'),
    commonHooks.setUpdatedAt('updatedAt')
  ],
  update: [
    commonHooks.setUpdatedAt('updatedAt'),
    auth.restrictToRoles({
      roles: ['admin'],
      ownerField: 'owner',
      owner: true
    })
  ],
  patch: [
    commonHooks.setUpdatedAt('updatedAt'),
    auth.restrictToRoles({
      roles: ['admin'],
      ownerField: 'owner',
      owner: true
    })
  ],
  remove: [
    auth.restrictToRoles({
      roles: ['admin'],
      ownerField: 'owner',
      owner: true
    })
  ]
}

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
}
