/**
 * Question with options Component
 * @flow
 */

import React from 'react'
import { Picker } from 'react-native'

import type { Props } from './FormFieldText.js'

type NewProps = {
  options: Array<Object>,
} & Props

const FormFieldSelect = (props: NewProps) => {
  const { input, meta, options } = props

  const pickerItem = options.map(option => {
    const { label: itemLabel, value } = option
    return <Picker.Item key={value} label={itemLabel} value={value} />
  })

  return (
    <Picker
      mode="dropdown"
      selectedValue={input.value}
      onValueChange={t => {
        input.onChange(t)
      }}
    >
      {pickerItem}
    </Picker>
  )
}

export default FormFieldSelect
