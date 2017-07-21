/* @flow*/
import { compose, mapProps, withHandlers, withState } from 'recompose'
import { Alert } from 'react-native'
import { reduxForm } from 'redux-form'
import { Actions } from 'react-native-router-flux'

import TimeLogView from '../Components/TimeLog/TimeLogView.js'

const catchError = err => {
  console.log(err.message)
  Alert.alert('Error', err.message)
}

const TimeLogEditor = compose(
  mapProps(props => {
    if (!props.newEntry) {
      const { date, duration, distance } = props.item
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
  withState('editing', 'setEditing', false),
  withState('buttonText', 'setButtonText', 'Edit'),
  withHandlers({
    alterEditing: props => () => {
      const { editing, setEditing, setButtonText } = props
      if (editing) {
        setEditing(false)
        setButtonText('Edit')
      } else {
        setEditing(true)
        setButtonText('Cancel Edit')
      }
    },
    cancelEditing: props => () => {
      Actions.pop()
    },
    deleteTimeLog: props => () => {
      const { item: { _id }, app } = props
      Alert.alert('Delete this time log?', 'Are you sure?', [
        {
          text: 'Yes',
          onPress: () => {
            app.service('timelogs').remove(_id).then(result => {
              if (result._id) {
                Actions.pop()
              }
            })
          },
        },
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      ])
    },
    onSubmit: props => values => {
      const { date, duration, distance } = values
      const { newEntry, item, app } = props
      const newValues = {
        date,
        duration: parseFloat(duration),
        distance: parseFloat(distance),
      }

      if (newEntry) {
        app
          .service('timelogs')
          .create(newValues)
          .then(result => {
            if (result._id) {
              Actions.pop()
            }
          })
          .catch(catchError)
      } else {
        newValues.owner = item.owner
        app
          .service('timelogs')
          .update(item._id, newValues)
          .then(result => {
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

export default TimeLogEditor
