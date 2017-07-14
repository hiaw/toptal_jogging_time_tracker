import React from 'react'
import { Text, View } from 'react-native'
import moment from 'moment'

import styles from './Styles/TimeLogRow.style.js'
import {
  getDistanceText,
  getDurationText,
  getSpeedText,
} from '../Helper/SpeedCalculator.js'

const TimeLogList = props => {
  const { date, distance, duration } = props
  const dateText = moment(date).format('DD/MM/YYYY')
  const distanceText = getDistanceText(distance)
  const durationText = getDurationText(duration)
  const speedText = getSpeedText(distance, duration)
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.firstRow]}>
        <Text style={styles.welcome}>
          {dateText}
        </Text>
        <Text style={styles.welcome}>
          {speedText}
        </Text>
      </View>
      <View style={[styles.row, styles.secondRow]}>
        <Text style={styles.welcome}>
          {distanceText}
        </Text>
        <Text style={styles.duration}>
          {durationText}
        </Text>
      </View>
    </View>
  )
}

export default TimeLogList
