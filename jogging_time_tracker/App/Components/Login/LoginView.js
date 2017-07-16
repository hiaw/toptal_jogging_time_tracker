import React from 'react'
import { View, Button } from 'react-native'
import { Field } from 'redux-form'

import { required, minLength, maxLength } from '../../Helper/Validators.js'

/* import SelectUsersButton from './SelectUsersButton.js'*/
import FormFieldText from '../Common/FormFieldText.js'

import styles from './LoginView.style.js'

const LoginView = props => {
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
        labelStyle={styles.labeldesign}
        iconName="cutlery"
        component={FormFieldText}
        name="email"
        title="EMAIL"
        validate={[required, minLength(2), maxLength(30)]}
      />
      <Field
        labelStyle={styles.labeldesign}
        iconName="cutlery"
        component={FormFieldText}
        name="password"
        title="PASSWORD"
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
