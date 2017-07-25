/* @flow*/
import { compose, mapProps, withHandlers, withState } from 'recompose'
import { Platform, Alert } from 'react-native'
import { reduxForm } from 'redux-form'
import { Actions } from 'react-native-router-flux'
import { RNS3 } from 'react-native-aws3'
import ImagePicker from 'react-native-image-picker'

import UserView from '../Components/User/UserView.js'

const catchError = err => {
  console.log(err.message)
  Alert.alert('Error', err.message)
}

const imagePickerOptions = {
  title: 'Select Product Image',
  storageOptions: {
    cameraRoll: true,
  },
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
  withState('uploading', 'setUploading', false),
  withState('imageURL', 'setImageURL', ''),
  withState('buttonText', 'setButtonText', 'Edit'),
  withHandlers({
    uploadImage: props => source => {
      const { setImageURL } = props
      const file = {
        uri: source,
        name: 'image.png',
        type: 'image/png',
      }

      const options = {
        keyPrefix: 'uploads/',
        bucket: 'toptal-jogging-timelogger',
        region: 'ap-southeast-2',
        accessKey: 'AKIAIDQZRFHOIUE7SL5A',
        secretKey: '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',
        successActionStatus: 201,
      }

      RNS3.put(file, options).then(response => {
        if (response.status !== 201)
          throw new Error('Failed to upload image to S3')
        console.log(response.body)
      })
    },
  }),
  withHandlers({
    pickImage: props => () => {
      const { uploadImage } = props
      ImagePicker.showImagePicker(imagePickerOptions, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker')
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error)
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton)
        } else {
          const path = Platform.OS === 'ios' ? 'file://' : ''
          const source = response.uri.replace(path, '')
          uploadImage(source)
        }
      })
    },
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
      const { email, password, role } = values
      const newValues = {
        email: email.toLowerCase(),
        roles: [role.toLowerCase()],
      }
      if (password != '') {
        newValues.password = password
      }

      if (newEntry) {
        app
          .service('users')
          .create(newValues)
          .then(result => {
            if (result._id) {
              Actions.pop()
            }
          })
          .catch(catchError)
      } else {
        app
          .service('users')
          .patch(user._id, newValues)
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
