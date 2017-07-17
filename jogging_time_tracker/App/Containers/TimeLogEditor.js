import { compose, mapProps, withHandlers, withState } from 'recompose'
import { Alert } from 'react-native'
import { reduxForm } from 'redux-form'
import { Actions } from 'react-native-router-flux'

import TimeLogView from '../Components/TimeLogView.js'

const catchError = err => {
  console.log(err.message)
  Alert.alert('Error', err.message)
}

const TimeLogContainer = compose(
  mapProps(props => {
    if (!props.newEntry) {
      const { date, duration, distance } = props.item
      console.log(props)
      return {
        ...props,
        initialValues: {
          date: new Date(date),
          duration: duration.toString(),
          distance: distance.toString(),
        },
      }
    }
    return props
  }),
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
      const { newEntry, item: { _id }, app } = props

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
        console.log(_id)
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
    },
  }),
)(TimeLogView)

export default TimeLogContainer
