/* @flow*/
import React from 'react'
import { Image, View, Button } from 'react-native'
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

const styles = {
  container: {
    marginTop: 65,
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

  let selectRole = (
    <Field
      component={FormFieldSelect}
      name="role"
      title="ROLE"
      editable={editing || newEntry}
      options={options}
    />
  )
  if (role === 'user') {
    selectRole = null
  }

  return (
    <View style={styles.container}>
      {showTimelogsButton}
      <Field
        autoCapitalize="none"
        component={FormFieldText}
        name="email"
        title="EMAIL"
        editable={editing || newEntry}
        validate={[required, email, minLength(2), maxLength(30)]}
      />
      <Field
        component={FormFieldText}
        name="password"
        title="PASSWORD"
        secureTextEntry
        editable={editing || newEntry}
        validate={[minLength(2), maxLength(30)]}
      />
      <Button title="upload image" onPress={pickImage} />
      {selectRole}
      <BottomButtons {...props} />
    </View>
  )
}

export default UserView
