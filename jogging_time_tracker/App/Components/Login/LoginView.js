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
  changeAdmin: any => () => mixed,
  changeManager: any => () => mixed,
  changeUser1: any => () => mixed,
  changeUser2: any => () => mixed,
  handleSubmit: any => () => mixed,
  onSubmit: () => mixed,
  alterRegistered: () => mixed,
  buttonText: string,
  alternateButtonText: string,
  valid: boolean,
}

const SelectUserButtons = (props: Props) => {
  const { changeAdmin, changeManager, changeUser1, changeUser2 } = props

  return (
    <View>
      <Button onPress={changeAdmin} title="Admin" />
      <Button onPress={changeManager} title="Manager" />
      <Button onPress={changeUser1} title="User1" />
      <Button onPress={changeUser2} title="User2" />
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
