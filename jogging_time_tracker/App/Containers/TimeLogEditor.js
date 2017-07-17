import { compose, withHandlers, withState } from 'recompose'
import { Alert } from 'react-native'
import { reduxForm } from 'redux-form'
import { Actions } from 'react-native-router-flux'

import TimeLogView from '../Components/TimeLogView.js'

const catchError = err => {
  console.log(err)
  setLoading(false)
  Alert.alert('Error', err.message)
}

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
    cancelEditing: props => () => {
      Actions.pop()
    },
    deleteTimeLog: props => id => {
      console.log(props)
      console.log(id)
      console.log('should be deleting this ' + id)
    },
    onSubmit: props => values => {
      const { newEntry, _id, setLoading, app } = props

      setLoading(true)
      if (newEntry) {
        app
          .service('timelogs')
          .create(values)
          .then(result => {
            if (result._id) {
              Actions.pop()
            }
          })
          .catch(catchError)
      } else {
        app
          .service('timelogs')
          .update(_id, values)
          .then(result => {
            console.log(result)
            if (result._id) {
              Actions.pop()
            }
          })
          .catch(catchError)
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
      distance: '5000',
      duration: '3600',
    },
  }),
)(TimeLogView)

export default TimeLogContainer
