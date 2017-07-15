import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'
/* import { StyleSheet, Text, View } from 'react-native'*/

import feathers from 'feathers/client'
import hooks from 'feathers-hooks'
import socketio from 'feathers-socketio/client'
import authentication from 'feathers-authentication-client'
import io from 'socket.io-client'

import redirectAfterLogin from './Components/Login/RedirectAfterLogin.js'
import Router from './Navigation/Router.js'

export default class Root extends Component {
  constructor() {
    super()

    const options = { transports: ['websocket'], forceNew: true }
    const socket = io('http://localhost:3030', options)

    this.app = feathers()
      .configure(socketio(socket))
      .configure(hooks())
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
    return <Router app={this.app} />
  }
}

/* <View style={styles.container}>
 *   <Text style={styles.welcome}>Welcome to React Native!</Text>
 *   <Text style={styles.instructions}>
 *     To get started, edit index.ios.js
 *   </Text>
 *   <Text style={styles.instructions}>
 *     Press Cmd+R to reload,{'\n'}
 *     Cmd+D or shake for dev menu
 *   </Text>
 * </View>

   const styles = StyleSheet.create({
   container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#F5FCFF',
   },
   welcome: {
   fontSize: 20,
   textAlign: 'center',
   margin: 10,
   },
   instructions: {
   textAlign: 'center',
   color: '#333333',
   marginBottom: 5,
   },
   })*/
