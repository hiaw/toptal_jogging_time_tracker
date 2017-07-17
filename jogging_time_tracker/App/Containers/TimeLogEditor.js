import { compose, withHandlers, withState } from 'recompose'
import { Alert } from 'react-native'
import { reduxForm } from 'redux-form'
import { Actions } from 'react-native-router-flux'

import TimeLogView from '../Components/TimeLogView.js'

const TimeLogContainer = compose(
  withState('loading', 'setLoading', false),
  withState('editting', 'setEditting', false),
  withState('buttonText', 'setButtonText', 'Edit'),
  withHandlers({
    alterEditting: props => () => {
      const { editting, setEditting, setButtonText } = props
      if (editting) {
        setEditting(false)
        setButtonText('Edit')
      } else {
        setEditting(true)
        setButtonText('Cancel Edit')
      }
    },
    onDelete: props => id => {
      console.log('should be deleting this ' + id)
    },
    onSubmit: props => values => {
      const { email, password } = values
      const { editting, setLoading, timeLogUser, app } = props
      setLoading(true)
      if (editting) {
        timeLogUser(email, password)
      } else {
        var userData = { email, password }
        app
          .service('users')
          .create(userData)
          .then(result => {
            timeLogUser(email, password)
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
    form: 'timelog_form',
    onSubmitFail: (errors, dispatch, submitError) => {
      console.log(submitError)
      console.log(errors)
    },
    initialValues: {
      date: new Date(),
    },
  }),
)(TimeLogView)

export default TimeLogContainer
