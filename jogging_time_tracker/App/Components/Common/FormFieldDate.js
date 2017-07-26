/* @flow*/
import React from 'react'
import { compose, withState } from 'recompose'
import { View } from 'react-native'
import { FormLabel, Button } from 'react-native-elements'
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker'

/* import styles from './Styles/TimeRow.style.js'*/
const styles = {
  button: {
    color: 'grey',
  },
}

import type { Props } from './FormFieldText.js'

export type NewProps = {
  ...Props,
  datePickerVisible: boolean,
  setDatePickerVisible: boolean => mixed,
  editable: boolean,
  minimumDate: Date,
  maximumDate: Date,
  mode: 'time' | 'date',
}

const TimeRow = (props: NewProps) => {
  const {
    testID,
    datePickerVisible,
    setDatePickerVisible,
    editable,
    minimumDate,
    maximumDate,
    title,
    mode,
    input,
  } = props

  const datePickerConfirm = date => {
    setDatePickerVisible(false)
    input.onChange(date)
  }

  const datePickerCancel = () => setDatePickerVisible(false)

  const dateString =
    mode === 'time'
      ? moment(input.value).format('HH:mm')
      : moment(input.value).format('DD/MM/YYYY')

  return (
    <View>
      <FormLabel>
        {title}:
      </FormLabel>
      <DateTimePicker
        mode={mode}
        date={input.value}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        isVisible={datePickerVisible}
        onConfirm={datePickerConfirm}
        onCancel={datePickerCancel}
      />
      <Button
        testID={testID}
        disabled={!editable}
        textStyle={styles.button}
        backgroundColor="#ffffff"
        onPress={() => setDatePickerVisible(true)}
        title={dateString}
      />
    </View>
  )
}

export default compose(
  withState('datePickerVisible', 'setDatePickerVisible', false),
)(TimeRow)
