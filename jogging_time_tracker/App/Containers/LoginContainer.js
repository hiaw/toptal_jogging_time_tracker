import { compose, withHandlers, withState } from 'recompose'
import { reduxForm } from 'redux-form'
import { Actions } from 'react-native-router-flux'

import LoginView from '../Components/Login/LoginView.js'

const LoginContainer = compose(
  withState('registered', 'setRegistered', true),
  withState('buttonText', 'setButtonText', 'Login'),
  withState('loadingText', 'setLoadingText', 'Logging in ...'),
  withState(
    'alternateButtonText',
    'setAlternateButtonText',
    'Not yet registered?',
  ),
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
  }),
  reduxForm({
    form: 'login_form',
    onSubmitFail: (errors, dispatch, submitError) => {
      console.log(submitError)
      console.log(errors)
    },
    initialValues: {
      email: 'feathers@example.com',
      password: 'secret',
    },
  }),
)(LoginView)

export default LoginContainer
