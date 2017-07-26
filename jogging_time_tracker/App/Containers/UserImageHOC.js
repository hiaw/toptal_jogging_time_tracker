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
      const { setUploading, user: { _id } } = props

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
        setUploading(false)
      })
    },
  }),
  withHandlers({
    resizeImage: props => original => {
      const { setUploading, uploadImage } = props
      ImageResizer.createResizedImage(original, 100, 100, 'JPEG', 80)
        .then(resizedImageUri => {
          let source = resizedImageUri
          if (Platform.OS === 'android') {
            source = resizedImageUri.replace('file://', '')
          }
          uploadImage(source)
        })
        .catch(err => {
          setUploading(false)
          console.error(err)
        })
    },
  }),
  withHandlers({
    pickImage: props => () => {
      const { setUploading, setImageURL, resizeImage } = props
      ImagePicker.showImagePicker(imagePickerOptions, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker')
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error)
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton)
        } else {
          setUploading(true)
          const path = Platform.OS === 'ios' ? 'file://' : ''
          const source = response.uri.replace(path, '')
          setImageURL(source)
          resizeImage(source)
        }
      })
    },
  }),
)

export default UserImageHOC
