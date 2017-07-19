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
import type { Props } from '../TimeRow/TimeLogView.js'

const styles = {
  container: {
    marginTop: 65,
  },
}

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
      <Field
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
        validate={[required, minLength(2), maxLength(30)]}
      />
      {editButton}
      {submitButton}
      {deleteButton}
    </View>
  )
}

export default UserView
