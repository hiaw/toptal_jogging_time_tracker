import { compose, withHandlers, withState } from 'recompose'
import { Alert } from 'react-native'
import { reduxForm } from 'redux-form'
import { Actions } from 'react-native-router-flux'

import TimeLogView from '../Components/TimeLogView.js'

const TimeLogContainer = compose(
  withState('loading', 'setLoading', false),
  withState('newEntry', 'setNewEntry', true),
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
    deleteTimeLog: props => id => {
      console.log(props)
      console.log(id)
      console.log('should be deleting this ' + id)
    },
    onSubmit: props => values => {
      console.log(values)
      console.log(props)
      const { email, password } = values
      const { newEntry, _id, setLoading, app } = props

      setLoading(true)
      if (newEntry) {
        app
          .service('timelogs')
          .create({
            date: new Date(),
            duration: 50,
            distance: 500,
          })
          .then(result => {
            console.log(result)
          })
          .catch(err => {
            console.log(err)
            setLoading(false)
            Alert.alert('Error', err.message)
          })
      } else {
        var userData = { email, password }
        app
          .service('users')
          .update(_id, userData)
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
