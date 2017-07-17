import React from 'react'
import { Button, Text, View } from 'react-native'
import { Field } from 'redux-form'

import { getSpeedText } from '../Helper/SpeedCalculator.js'

import { required, number, minValue } from '../Helper/Validators.js'
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

  console.log(valid)
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

  let editButton = <Button onPress={alterEditting} title={buttonText} />
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
        maximumDate={new Date()}
        validate={[required]}
      />
      <Field
        component={FormFieldText}
        name="distance"
        title="Distance"
        keyboardType="numeric"
        validate={[required, number, minValue(0.001)]}
      />
      <Field
        component={FormFieldText}
        name="duration"
        title="Duration"
        keyboardType="numeric"
        validate={[required, number, minValue(0.001)]}
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
