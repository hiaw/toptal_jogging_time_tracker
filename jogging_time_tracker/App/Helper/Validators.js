/* @flow*/

export const required = value => (value ? undefined : 'Required')

export const maxLength = max => (value: string) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

export const minLength = min => (value: string) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined

export const minValue = min => (value: number) =>
  value && value < min ? `Must be at least ${min}` : undefined

export const maxValue = max => value =>
  value && value > max ? `Must be less than ${max}` : undefined

export const isInteger = value =>
  value && +value % 1 ? `Must be an integer` : undefined

export const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined

export const email = (value: string) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

export const alphaNumeric = (value: string) =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined

export const phoneNumber = (value: string) =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined
