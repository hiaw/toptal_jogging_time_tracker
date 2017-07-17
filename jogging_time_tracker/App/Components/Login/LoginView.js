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

/* import SelectUsersButton from './SelectUsersButton.js'*/
import FormFieldText from '../Common/FormFieldText.js'

import styles from './LoginView.style.js'

export type Props = {
  handleSubmit: (any) => () => mixed,
  onSubmit: () => mixed,
  alterRegistered: () => mixed,
  buttonText: string,
  alternateButtonText: string,
  valid: boolean,
}

const LoginView = (props: Props) => {
  /* render () {
   *   if (this.loading) {
   *     return <Spinner visible textContent={this.loadingText}
   *              textStyle={spinnerStyle} />
   *   } else {
   *     return this.renderMain()
   *   }
   * }
   */
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

/* <SelectUsersButton setEmailPassword={this.setEmailPassword.bind(this)} />*/
