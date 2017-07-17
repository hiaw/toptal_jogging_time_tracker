import React from 'react'
import { Button, Text, View } from 'react-native'
import { Field } from 'redux-form'

import { getSpeedText } from '../Helper/SpeedCalculator.js'

import { required, minLength, maxLength } from '../Helper/Validators.js'
import FormFieldText from './Common/FormFieldText.js'
import FormFieldDate from './Common/FormFieldDate.js'

const TimeLogView = props => {
  const {
    _id,
    buttonText,
    editting,
    alterEditting,
    handleSubmit,
    onSubmit,
    deleteTimeLog,
    cancelEditing,
    valid,
    newEntry,
  } = props

  /* const speedText = getSpeedText(distance, duration)*/
  let submitButton = null
  if (editting || newEntry) {
    submitButton = (
      <Button
        disabled={!valid}
        onPress={handleSubmit(onSubmit)}
        title="Submit"
      />
    )
  }

  let editButton = (
    <Button disabled={!valid} onPress={alterEditting} title={buttonText} />
  )
  let deleteButton = null
  if (editting) {
    deleteButton = <Button onPress={() => deleteTimeLog(_id)} title="Delete" />
  }
  if (newEntry) {
    deleteButton = <Button onPress={cancelEditing} title="Cancel" />
    editButton = null
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
      {editButton}
      {submitButton}
      {deleteButton}
    </View>
  )
}

export default TimeLogView

/* <Text style={styles.welcome}>
 *   {speedText}
 * </Text>*/
