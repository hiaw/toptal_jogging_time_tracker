/* @flow*/
import _ from 'lodash'

const MINUTE_PER_HOUR = 3600

const padNumber = number => {
  let padded = number + ''
  if (number < 10) {
    padded = '0' + padded
  }
  return padded
}

export const getDistanceText = (distance: number) => {
  const kms = _.round(distance / 1000, 2)
  const meters = _.round(distance, 1)
  let distanceText = `${meters} m`
  if (distance > 1000) distanceText = `${kms} km`
  return distanceText
}

export const getDurationText = (duration: number) => {
  const hours = Math.floor(duration / MINUTE_PER_HOUR)
  const minutes = Math.floor(duration % MINUTE_PER_HOUR / 60)
  const seconds = _.round(duration % 60, 1)
  const durationText = `${hours}:${padNumber(minutes)}:${padNumber(seconds)}`
  return durationText
}

export const formatSpeed = (speed: number) => {
  const nspeed = _.round(speed, 1)
  const speedText = `${nspeed} km/h`
  return speedText
}

export const getSpeedText = (distance: number, duration: number) => {
  const kms = distance / 1000
  const hours = duration / MINUTE_PER_HOUR
  const speed = _.round(kms / hours, 1)
  const speedText = `${speed} km/h`
  return speedText
}
