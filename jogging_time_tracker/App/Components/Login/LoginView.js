import React from 'react'
import { Alert, View, TextInput, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'

import styles from './LoginView.style.js'

/* import SelectUsersButton from './SelectUsersButton.js'*/
import redirectAfterLogin from './RedirectAfterLogin.js'

const LoginView = () => {
  /* @computed get loadingText() {
   *   return this.registering? 'Registering ...' : 'Logging in ...'
   * }
   * @computed get buttonText() {
   *   return this.registering? 'Register' : 'Login'
   * }
   * @computed get alternateButtonText() {
   *   return this.registering? 'Already Registered?' : 'Not yet registered?'
   * }

   * registerUser (email, password) {
   *   var userData = {email, password}

   *   this.props.app.service('users').create(userData).then((result) => {
   *     this.loginUser(email, password)
   *   }).catch((err) => {
   *     console.log(err)
   *     this.loading = false
   *     Alert.alert('Error', err.message)
   *   })
   * }

   * loginUser (email, password) {
   *   this.props.app.authenticate({
   *     type: 'local',
   *     email: email,
   *     password: password
   *   }).then(res => {
   *     this.loading = false
   *     store.userDevice.userId = res.data._id
   *     redirectAfterLogin(res)
   *   }).catch(error => {
   *     this.loading = false
   *     setTimeout(function(){
   *       Alert.alert('Error', 'Please enter a valid email or password.')
   *     }, 100);
   *   })
   * }

   * submit () {
   *   this.loading = true
   *   if (this.registering) {
   *     this.registerUser(this.loginEmail, this.loginPassword)
   *   } else {
   *     this.loginUser(this.loginEmail, this.loginPassword)
   *   }
   * }

   * setEmailPassword (email, password) {
   *   this.loginEmail = email
   *   this.loginPassword = password
   *   this.registering = false
   * }

   * render () {*/
  /* if (this.loading) {
   *   return <Spinner visible textContent={this.loadingText}
   *     textStyle={spinnerStyle} />
   * } else {
   *   return this.renderMain()
   * }
     }

     renderMain () {*/

  const loginEmail = 'est'
  const loginPassword = 'test'
  const buttonText = 'Register'
  const alternateButtonText = 'Already Registered'
  const submit = () => {}

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        defaultValue={loginEmail}
        onChangeText={value => {
          this.loginEmail = value
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        defaultValue={loginPassword}
        onChangeText={value => {
          this.loginPassword = value
        }}
        secureTextEntry
      />
      <Button onPress={() => submit()} title={buttonText} />
      <Button
        onPress={() => {
          this.registering = !this.registering
        }}
        title={alternateButtonText}
      />
    </View>
  )
}

export default LoginView

/* <SelectUsersButton setEmailPassword={this.setEmailPassword.bind(this)} />*/
