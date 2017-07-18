/* @flow*/

export const required = (value: string) => (value ? undefined : 'Required')

export const maxLength = (max: number) => (value: string) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

export const minLength = (min: number) => (value: string) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

export const number = (value: number) =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined

export const minValue = (min: number) => (value: number) =>
  value && value < min ? `Must be at least ${min}` : undefined

export const maxValue = (max: number) => (value: number) =>
  value && value > max ? `Must be less than ${max}` : undefined

export const email = (value: string) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
