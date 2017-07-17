import React from 'react'
import { Button, Text, View } from 'react-native'
import { Field } from 'redux-form'

import { getSpeedText } from '../Helper/SpeedCalculator.js'

import { required, minLength, maxLength } from '../Helper/Validators.js'
import FormFieldText from './Common/FormFieldText.js'
import FormFieldDate from './Common/FormFieldDate.js'

const TimeLogView = props => {
  const {
    buttonText,
    editting,
    alterEditting,
    handleSubmit,
    onSubmit,
    deleteTimeLog,
    valid,
  } = props

  /* const speedText = getSpeedText(distance, duration)*/
  let deleteButton = null
  let submitButton = null
  if (editting) {
    submitButton = (
      <Button
        disabled={!valid}
        onPress={handleSubmit(onSubmit)}
        title="Submit"
      />
    )
    deleteButton = <Button onPress={deleteTimeLog} title="Delete" />
  }

  return (
    <View>
      <Field
        component={FormFieldDate}
        name="date"
        title="Date"
        validate={[required, minLength(2), maxLength(30)]}
      />
      <Field
        component={FormFieldText}
        name="distance"
        title="Distance"
        validate={[required, minLength(2), maxLength(30)]}
      />
      <Field
        component={FormFieldText}
        name="duration"
        title="Duration"
        validate={[required, minLength(2), maxLength(30)]}
      />
      <Button disabled={!valid} onPress={alterEditting} title={buttonText} />
      {submitButton}
      {deleteButton}
    </View>
  )
}

export default TimeLogView

/* <Text style={styles.welcome}>
 *   {speedText}
 * </Text>*/
