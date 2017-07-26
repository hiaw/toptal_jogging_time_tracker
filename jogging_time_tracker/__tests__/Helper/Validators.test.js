import {
  required,
  maxLength,
  minLength,
  number,
  minValue,
  maxValue,
  email,
} from '../../App/Helper/Validators.js'

// required
it('test correct required ', () => {
  expect(required('something')).toBeUndefined()
})

it('test required', () => {
  expect(required('')).toBe('Required')
})

it('test required empty', () => {
  expect(required()).toBe('Required')
})

it('test required null', () => {
  expect(required(null)).toBe('Required')
})

// maxLength
it('test maxLength', () => {
  const f = maxLength()
  expect(f('a')).toBeUndefined()
})

it('test correct maxLength', () => {
  const f = maxLength(2)
  expect(f('a')).toBeUndefined()
})

it('test maxLength with number', () => {
  const f = maxLength(1)
  expect(f('aa')).toBe(`Must be 1 characters or less`)
})

// minLength
it('test minLength', () => {
  const f = minLength()
  expect(f('a')).toBeUndefined()
})

it('test correct minLength', () => {
  const f = minLength(1)
  expect(f('a')).toBeUndefined()
})

it('test minLength with number', () => {
  const f = minLength(3)
  expect(f('aa')).toBe(`Must be 3 characters or more`)
})

// number
it('test number text', () => {
  expect(number('a')).toBe('Must be a number')
})

it('test number empty', () => {
  expect(number('')).toBeUndefined()
})

it('test number number', () => {
  expect(number('1234')).toBeUndefined()
})

it('test number float', () => {
  expect(number('-01234.23')).toBeUndefined()
})

// maxValue
it('test correct max value', () => {
  const f = maxValue(10)
  expect(f('9')).toBeUndefined()
})

it('test incorrect max value', () => {
  const f = maxValue(10)
  expect(f('11')).toBe('Must be less than 10')
})

it('test incorrect max value', () => {
  const f = maxValue(10)
  expect(f('a')).toBeUndefined()
})

// minValue
it('test correct min value', () => {
  const f = minValue(10)
  expect(f('11')).toBeUndefined()
})

it('test incorrect min value', () => {
  const f = minValue(10)
  expect(f('9')).toBe('Must be at least 10')
})

it('test incorrect min value', () => {
  const f = minValue(10)
  expect(f('a')).toBeUndefined()
})

// email
it('test correct email', () => {
  expect(email('a@a.com')).toBeUndefined()
})

it('test incorrect email', () => {
  expect(email('a@a')).toBe('Invalid email address')
})
