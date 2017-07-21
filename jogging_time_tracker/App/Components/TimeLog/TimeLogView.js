/* @flow*/
import React from 'react'
import { Button, Text, View } from 'react-native'
import { Field } from 'redux-form'

import { getSpeedText } from '../../Helper/SpeedCalculator.js'

import { required, number, minValue } from '../../Helper/Validators.js'
import FormFieldText from '../Common/FormFieldText.js'
import FormFieldDate from '../Common/FormFieldDate.js'

export type Props = {
  buttonText: string,
  valid: boolean,
  newEntry: boolean,
  editing: boolean,
  alterEditing: () => mixed,
  handleSubmit: any => () => mixed,
  onSubmit: () => mixed,
  deleteTimeLog: () => mixed,
  cancelEditing: () => mixed,
}

const TimeLogView = (props: Props) => {
  const {
    buttonText,
    valid,
    newEntry,
    editing,
    alterEditing,
    handleSubmit,
    onSubmit,
    deleteTimeLog,
    cancelEditing,
  } = props

  /* const speedText = getSpeedText(distance, duration)*/
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
    deleteButton = <Button onPress={deleteTimeLog} title="Delete" />
  }
  if (newEntry) {
    deleteButton = <Button onPress={cancelEditing} title="Cancel" />
    editButton = null
  }

  return (
    <View style={{ flex: 1, marginTop: 60, backgroundColor: '#F5FCFF' }}>
      <Field
        component={FormFieldDate}
        name="date"
        title="Date"
        editable={editing || newEntry}
        maximumDate={new Date()}
        validate={[required]}
      />
      <Field
        component={FormFieldText}
        name="distance"
        title="Distance"
        keyboardType="numeric"
        editable={editing || newEntry}
        validate={[required, number, minValue(0.001)]}
      />
      <Field
        component={FormFieldText}
        name="duration"
        title="Duration"
        keyboardType="numeric"
        editable={editing || newEntry}
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