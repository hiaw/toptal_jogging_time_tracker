'use strict'

const globalHooks = require('../../../hooks')
const hooks = require('feathers-hooks')
const commonHooks = require('feathers-hooks-common')
const auth = require('feathers-authentication').hooks

exports.before = {
  all: [],
  find: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToRoles({
      roles: ['admin', 'manager']
    })
  ],
  get: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToRoles({
      roles: ['admin', 'manager'],
      ownerField: '_id',
      owner: true
    })
  ],
  create: [
    auth.hashPassword(),
    commonHooks.setCreatedAt('createdAt'),
    commonHooks.setUpdatedAt('updatedAt')
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToRoles({
      roles: ['admin', 'manager'],
      ownerField: '_id',
      owner: true
    }),
    commonHooks.setUpdatedAt('updatedAt')
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToRoles({
      roles: ['admin', 'manager'],
      ownerField: '_id',
      owner: true
    }),
    commonHooks.setUpdatedAt('updatedAt')
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToRoles({
      roles: ['admin', 'manager'],
      ownerField: '_id',
      owner: true
    })
  ]
}

exports.after = {
  all: [hooks.remove('password')],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
}
