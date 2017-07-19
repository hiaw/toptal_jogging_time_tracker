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

import styles from './Style/LoginView.style.js'

export type Props = {
  changeUser: any => () => mixed,
  handleSubmit: any => () => mixed,
  onSubmit: () => mixed,
  alterRegistered: () => mixed,
  buttonText: string,
  alternateButtonText: string,
  valid: boolean,
}

const SelectUserButtons = (props: Props) => {
  const { changeUser } = props

  return (
    <View>
      <Button onPress={() => changeUser('admin@test.com')} title="Admin" />
      <Button onPress={() => changeUser('manager@test.com')} title="Manager" />
      <Button onPress={() => changeUser('user1@test.com')} title="User1" />
      <Button onPress={() => changeUser('user2@test.com')} title="User2" />
    </View>
  )
}

const LoginView = (props: Props) => {
  const {
    handleSubmit,
    onSubmit,
    alterRegistered,
    buttonText,
    alternateButtonText,
    valid,
  } = props

  return (
    <View style={styles.container}>
      <SelectUserButtons {...props} />
      <Field
        component={FormFieldText}
        name="email"
        title="EMAIL"
        validate={[required, email, minLength(2), maxLength(30)]}
      />
      <Field
        component={FormFieldText}
        name="password"
        title="PASSWORD"
        secureTextEntry
        validate={[required, minLength(2), maxLength(30)]}
      />
      <Button
        disabled={!valid}
        onPress={handleSubmit(onSubmit)}
        title={buttonText}
      />
      <Button onPress={alterRegistered} title={alternateButtonText} />
    </View>
  )
}

export default LoginView
