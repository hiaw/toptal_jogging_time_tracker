/* @flow*/
import { compose, mapProps, withHandlers, withState } from 'recompose'
import { Alert } from 'react-native'
import { reduxForm } from 'redux-form'
import { Actions } from 'react-native-router-flux'

import UserView from '../Components/User/UserView.js'

const catchError = err => {
  console.log(err.message)
  Alert.alert('Error', err.message)
}

const UserEditor = compose(
  mapProps(props => {
    if (!props.newEntry) {
      const { email, roles } = props.user
      return {
        ...props,
        initialValues: {
          email,
          role: roles[0],
        },
      }
    }
    return props
  }),
  withState('editing', 'setEditing', false),
  withState('buttonText', 'setButtonText', 'Edit'),
  withHandlers({
    showTimelogs: props => () => {
      const { user: { _id } } = props
      Actions.timelogs({ owner: _id })
    },
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
    deleteUser: props => () => {
      const { user: { _id }, app } = props
      Alert.alert('Delete this user?', 'Are you sure?', [
        {
          text: 'Yes',
          onPress: () => {
            app.service('users').remove(_id).then(result => {
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
      const { newEntry, user, app } = props

      if (newEntry) {
        app
          .service('users')
          .create(values)
          .then(result => {
            console.log(result)
            if (result._id) {
              Actions.pop()
            }
          })
          .catch(catchError)
      } else {
        app
          .service('users')
          .update(user._id, values)
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
    form: 'user_form',
    onSubmitFail: (errors, dispatch, submitError) => {
      console.log(submitError)
      console.log(errors)
    },
  }),
)(UserView)

export default UserEditor
