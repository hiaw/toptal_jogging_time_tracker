/* @flow*/
import { compose, withHandlers, withState } from 'recompose'
import { Platform } from 'react-native'
import { RNS3 } from 'react-native-aws3'
import ImageResizer from 'react-native-image-resizer'
import ImagePicker from 'react-native-image-picker'

const imagePickerOptions = {
  title: 'Select Product Image',
  storageOptions: {
    cameraRoll: true,
  },
}

const UserImageHOC = compose(
  withState('uploading', 'setUploading', false),
  withState('imageURL', 'setImageURL', ''),
  withHandlers({
    uploadImage: props => source => {
      const { setImageURL, user: { _id } } = props
      const file = {
        uri: source,
        name: `${_id}.png`,
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
  }),
)

export default UserImageHOC
