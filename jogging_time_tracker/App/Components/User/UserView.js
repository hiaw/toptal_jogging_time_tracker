/* @flow*/
import React from 'react'
import {
  Image,
  View,
  TouchableHighlight,
  Button,
  ProgressViewIOS,
} from 'react-native'
import { Field } from 'redux-form'

import {
  required,
  email,
  minLength,
  maxLength,
} from '../../Helper/Validators.js'

import BottomButtons from './BottomButtons.js'
import FormFieldText from '../Common/FormFieldText.js'
import FormFieldSelect from '../Common/FormFieldSelect.js'
import type { Props } from '../TimeRow/TimeLogView.js'

const placeHolder = require('../../Images/no_image_placeholder.png')

const styles = {
  container: {
    marginTop: 65,
  },
  image: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
}

const options = [
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'Manager',
    value: 'manager',
  },
  {
    label: 'User',
    value: '',
  },
]

const UserView = (props: Props) => {
  const {
    uploading,
    imageURL,
    role,
    valid,
    newEntry,
    editing,
    handleSubmit,
    onSubmit,
    pickImage,
    showTimelogs,
  } = props

  let showTimelogsButton = null
  if (role === 'admin') {
    showTimelogsButton = <Button onPress={showTimelogs} title="Show Timelogs" />
  }

  const enableInput = editing || newEntry
  const disableInput = !enableInput

  let selectRole = (
    <Field
      component={FormFieldSelect}
      name="role"
      title="ROLE"
      editable={enableInput}
      options={options}
    />
  )
  if (role === 'user') {
    selectRole = null
  }

  let imageComp
  if (imageURL === '') {
    imageComp = <Image style={styles.image} source={placeHolder} />
  } else {
    imageComp = <Image style={styles.image} source={{ uri: imageURL }} />
  }

  let progress = null
  if (uploading) {
    progress = <ProgressViewIOS />
  }

  return (
    <View style={styles.container}>
      {showTimelogsButton}
      <Field
        autoCapitalize="none"
        component={FormFieldText}
        name="email"
        title="EMAIL"
        editable={enableInput}
        validate={[required, email, minLength(2), maxLength(30)]}
      />
      <Field
        component={FormFieldText}
        name="password"
        title="PASSWORD"
        secureTextEntry
        editable={enableInput}
        validate={[minLength(2), maxLength(30)]}
      />
      {progress}
      <TouchableHighlight disabled={disableInput} onPress={pickImage}>
        {imageComp}
      </TouchableHighlight>
      {selectRole}
      <BottomButtons {...props} />
    </View>
  )
}

export default UserView
