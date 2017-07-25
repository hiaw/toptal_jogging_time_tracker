/* @flow*/
import React from 'react'
import { Button, Text, ScrollView } from 'react-native'
import { Field } from 'redux-form'

import TimeLogMapView from './TimeLogMapView.js'
import { getSpeedText } from '../../Helper/SpeedCalculator.js'

import {
  required,
  number,
  minValue,
  maxValue,
} from '../../Helper/Validators.js'
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
    coordinate,
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
    <ScrollView
      contentContainerStyle={{
        paddingTop: 60,
        backgroundColor: '#F5FCFF',
      }}
    >
      <Field
        testID="timelog_form_date"
        component={FormFieldDate}
        name="date"
        title="Date"
        editable={editing || newEntry}
        maximumDate={new Date()}
        validate={[required]}
      />
      <Field
        testID="timelog_form_distance"
        component={FormFieldText}
        name="distance"
        title="Distance"
        keyboardType="numeric"
        editable={editing || newEntry}
        validate={[required, number, minValue(0.001)]}
      />
      <Field
        testID="timelog_form_duration"
        component={FormFieldText}
        name="duration"
        title="Duration"
        keyboardType="numeric"
        editable={editing || newEntry}
        validate={[required, number, minValue(0.001)]}
      />
      <Field
        testID="timelog_form_latitude"
        component={FormFieldText}
        name="latitude"
        title="latitude"
        keyboardType="numeric"
        editable={editing || newEntry}
        validate={[required, number, minValue(-90), maxValue(90)]}
      />
      <Field
        testID="timelog_form_longitude"
        component={FormFieldText}
        name="longitude"
        title="Longitude"
        keyboardType="numeric"
        editable={editing || newEntry}
        validate={[required, number, minValue(-180), maxValue(180)]}
      />
      {editButton}
      {submitButton}
      {deleteButton}
      <TimeLogMapView coordinate={coordinate} />
    </ScrollView>
  )
}

export default TimeLogView

/* <Text style={styles.welcome}>
 *   {speedText}
 * </Text>*/
