import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import moment from 'moment'
import _ from 'lodash'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})

const getDistanceText = distance => {
  const kms = _.round(distance / 1000, 3)
  const meters = _.round(distance, 2)
  let distanceText = `${meters} m`
  if (distance > 1000) distanceText = `${kms} km`
  return distanceText
}

const MINUTE_PER_HOUR = 3600

const padNumber = number => {
  let padded = number + ''
  if (number < 10) {
    padded = '0' + padded
  }
  return padded
}

const getDurationText = duration => {
  const hours = Math.floor(duration / MINUTE_PER_HOUR)
  const minutes = Math.floor(duration % MINUTE_PER_HOUR / 60)
  const seconds = _.round(duration % 60, 1)
  const durationText = `${hours}:${padNumber(minutes)}:${padNumber(seconds)}`
  return durationText
}

const getSpeedText = (distance, duration) => {
  const kms = distance / 1000
  const hours = duration / MINUTE_PER_HOUR
  const speed = _.round(kms / hours, 2)
  const speedText = `${speed} km/h`
  return speedText
}

const TimeLogList = props => {
  const { date, distance, duration } = props
  const dateText = moment(date).format('DD/MM/YYYY')
  const distanceText = getDistanceText(distance)
  const durationText = getDurationText(duration)
  const speedText = getSpeedText(distance, duration)
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        {dateText}
      </Text>
      <Text style={styles.welcome}>
        {distanceText}
      </Text>
      <Text style={styles.welcome}>
        {durationText}
      </Text>
      <Text style={styles.welcome}>
        {speedText}
      </Text>
    </View>
  )
}

export default TimeLogList
