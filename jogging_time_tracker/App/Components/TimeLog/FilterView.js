/* @flow*/
import React from 'react'
import { Button, View } from 'react-native'
import { Field } from 'redux-form'

import FormFieldDate from '../Common/FormFieldDate.js'

export type Props = {
  toDate: Date,
  fromDate: Date,
  handleSubmit: any => () => mixed,
  onSubmit: () => mixed,
}

const FilterView = (props: Props) => {
  const { toDate, fromDate, handleSubmit, onSubmit } = props

  return (
    <View style={{ flex: 1, paddingTop: 60, backgroundColor: '#F5FCFF' }}>
      <Field
        component={FormFieldDate}
        name="fromDateValue"
        title="From"
        editable
        minimumDate={new Date(0)}
        maximumDate={new Date(toDate)}
      />
      <Field
        component={FormFieldDate}
        name="toDateValue"
        title="To"
        editable
        minimumDate={new Date(fromDate)}
        maximumDate={new Date()}
      />
      <Button onPress={handleSubmit(onSubmit)} title="OK" />
    </View>
  )
}

export default FilterView
