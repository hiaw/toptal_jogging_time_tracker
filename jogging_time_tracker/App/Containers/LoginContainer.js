/* @flow*/
import { compose, withHandlers, withState } from 'recompose'
import { Alert } from 'react-native'
import { reduxForm } from 'redux-form'
import { Actions } from 'react-native-router-flux'

import LoginView from '../Components/Login/LoginView.js'

import redirectAfterLogin from '../Components/Login/RedirectAfterLogin.js'

const LoginContainer = compose(
  withState('loading', 'setLoading', false),
  withState('registered', 'setRegistered', true),
  withState('buttonText', 'setButtonText', 'Login'),
  withState('loadingText', 'setLoadingText', 'Logging in ...'),
  withState(
    'alternateButtonText',
    'setAlternateButtonText',
    'Not yet registered?',
  ),
  withHandlers({
    loginUser: props => (email, password) => {
      const { app, setLoading } = props
      app
        .authenticate({
          strategy: 'local',
          email: email,
          password: password,
        })
        .then(res => {
          console.log(res)
          setLoading(false)
          redirectAfterLogin(res)
        })
        .catch(error => {
          console.log(error)
          setLoading(false)
          setTimeout(function() {
            Alert.alert('Error', 'Please enter a valid email or password.')
          }, 100)
        })
    },
  }),
  withHandlers({
    alterRegistered: props => () => {
      const {
        registered,
        setRegistered,
        setButtonText,
        setLoadingText,
        setAlternateButtonText,
      } = props
      if (registered) {
        setRegistered(false)
        setButtonText('Register')
        setLoadingText('Registering ...')
        setAlternateButtonText('Already registered?')
      } else {
        setRegistered(true)
        setButtonText('Login')
        setLoadingText('Logging in ...')
        setAlternateButtonText('Note yet registered?')
      }
    },
    onSubmit: props => values => {
      const { email, password } = values
      const { registered, setLoading, loginUser, app } = props
      setLoading(true)
      if (registered) {
        loginUser(email, password)
      } else {
        var userData = { email, password }
        app
          .service('users')
          .create(userData)
          .then(result => {
            loginUser(email, password)
          })
          .catch(err => {
            console.log(err)
            setLoading(false)
            Alert.alert('Error', err.message)
          })
      }
    },
  }),
  reduxForm({
    form: 'login_form',
    onSubmitFail: (errors, dispatch, submitError) => {
      console.log(submitError)
      console.log(errors)
    },
    initialValues: {
      email: 'user1@test.com',
      password: 'password',
    },
  }),
)(LoginView)

export default LoginContainer
