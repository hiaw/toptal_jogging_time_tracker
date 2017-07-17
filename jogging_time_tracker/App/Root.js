/* @flow*/
import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'

import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import feathers from 'feathers/client'
import hooks from 'feathers-hooks'
import socketio from 'feathers-socketio/client'
import authentication from 'feathers-authentication-client'
import io from 'socket.io-client'

import redirectAfterLogin from './Components/Login/RedirectAfterLogin.js'
import Router from './Navigation/Router.js'

const rootReducer = combineReducers({ form })
const store = createStore(rootReducer)

export default class Root extends Component {
  constructor() {
    super()

    const options = { transports: ['websocket'], forceNew: true }
    const socket = io('http://localhost:3030', options)

    this.app = feathers()
      .configure(hooks())
      .configure(socketio(socket))
      // Use AsyncStorage to store our login token
      .configure(
        authentication({
          storage: AsyncStorage,
        }),
      )
  }

  componentDidMount() {
    this.app.io.on('connect', () => {
      this.app.authenticate().then(redirectAfterLogin).catch(error => {
        console.log(error)
        Actions.login()
      })
    })

    this.app.io.on('disconnect', () => {
      Actions.login()
    })
  }

  render() {
    return (
      <Provider store={store}>
        <Router app={this.app} />
      </Provider>
    )
  }
}
