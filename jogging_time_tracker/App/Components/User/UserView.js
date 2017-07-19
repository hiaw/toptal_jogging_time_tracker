/* @flow*/
import React from 'react'
import { View, Button } from 'react-native'
import { Field } from 'redux-form'

import {
  required,
  email,
  minLength,
  maxLength,
} from '../../Helper/Validators.js'

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
    buttonText,
    valid,
    newEntry,
    editing,
    alterEditing,
    handleSubmit,
    onSubmit,
    deleteUser,
    cancelEditing,
    showTimelogs,
  } = props

  let submitButton = null
  if (editing || newEntry) {
    submitButton = (
      <Button
        disabled={!valid}
        onPress={handleSubmit(onSubmit)}
        title="Submit"
      />
    )
  }

  let editButton = <Button onPress={alterEditing} title={buttonText} />
  let deleteButton = null
  if (editing) {
    deleteButton = <Button onPress={deleteUser} title="Delete" />
  }
  if (newEntry) {
    deleteButton = <Button onPress={cancelEditing} title="Cancel" />
    editButton = null
  }

  return (
    <View style={styles.container}>
      <Button onPress={showTimelogs} title="Show Timelogs" />
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
      <Field
        component={FormFieldSelect}
        name="role"
        title="ROLE"
        editable={editing || newEntry}
        options={options}
      />
      {editButton}
      {submitButton}
      {deleteButton}
    </View>
  )
}

export default UserView
