/* @flow*/
import { compose, withHandlers, withState } from 'recompose'
import { Alert } from 'react-native'
import { reduxForm, change } from 'redux-form'

import LoginView from '../Components/Login/LoginView.js'

import redirectAfterLogin from '../Components/Login/RedirectAfterLogin.js'

const form = 'login_form'

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
          type: 'local',
          email,
          password,
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
        setAlternateButtonText('Not yet registered?')
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
    form,
    onSubmitFail: (errors, dispatch, submitError) => {
      console.log(submitError)
      console.log(errors)
    },
    initialValues: {
      email: 'user1@test.com',
      password: '123456',
    },
  }),
  withHandlers({
    changeUser: props => email => {
      const { dispatch } = props
      dispatch(change(form, 'email', email))
    },
  }),
  withHandlers({
    changeAdmin: ({ changeUser }) => () => {
      changeUser('admin@test.com')
    },
    changeManager: ({ changeUser }) => () => {
      changeUser('manager@test.com')
    },
    changeUser1: ({ changeUser }) => () => {
      changeUser('user1@test.com')
    },
    changeUser2: ({ changeUser }) => () => {
      changeUser('user2@test.com')
    },
  }),
)(LoginView)

export default LoginContainer
