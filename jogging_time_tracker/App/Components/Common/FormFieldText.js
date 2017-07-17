/* @flow*/
import React from 'react'
import { View } from 'react-native'
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

const iconColor = '#EE7023'

const styles = {
  row: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
}
export type Props = {
  label: string,
    labelStyle: any,
    iconName: string,
  title?: string,
  input: {
    onBlur: (any) => mixed,
    onChange: (any) => mixed,
    onFocus: (any) => mixed,
    value: any,
  },
  meta: {
    active: boolean,
    valid: boolean,
    touched: boolean,
    error?: string,
  },
    blurblur: (any) => mixed,
  disabled?: boolean,
}

type NewProps = {
  textInputStyle?: any,
} & Props

const FormFieldText = (props: NewProps) => {
  const {
    label,
    labelStyle,
    iconName,
    title,
    input,
    meta,
    textInputStyle,
    blurblur,
    ...inputProps
  } = props

  let validation = null

  let onBlur = input.onBlur
  if (blurblur) {
    onBlur = e => input.onBlur(blurblur(e))
  }

  // do not display warning if the field has not been touched or if it's currently being edited
  if (meta.touched && meta.error) {
    validation = (
      <FormValidationMessage>
        {meta.error}
      </FormValidationMessage>
    )
  }

  let icon = null
  if (iconName) {
    icon = (
      <Icon.Button
        name={iconName}
        iconStyle={styles.icon}
        color={iconColor}
        backgroundColor="transparent"
        size={20}
      />
    )
  }

  return (
    <View>
      <FormLabel labelStyle={labelStyle}>
        {title}:{' '}
      </FormLabel>
      <View style={styles.row}>
        {icon}
        <FormInput
          testID="textQuestionInput"
          {...inputProps}
          placeholder="Tap to write"
          value={input.value}
          onChangeText={input.onChange}
          onBlur={onBlur}
          onFocus={input.onFocus}
          underlineColorAndroid="transparent"
        />
      </View>
      {validation}
    </View>
  )
}

export default FormFieldText
