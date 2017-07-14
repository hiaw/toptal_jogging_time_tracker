import React from 'react'
import { Text, View } from 'react-native'
import moment from 'moment'

import { getSpeedText } from '../Helper/SpeedCalculator.js'

import styles from './Styles/WeeklyAverageRow.style.js'

const TimeLogList = props => {
  const { date, distance, duration } = props
  const dateText = `Week ${moment(date).isoWeek()}, ${moment(date).year()}`
  const speedText = getSpeedText(distance, duration)

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        {dateText}
      </Text>
      <Text style={styles.welcome}>
        {speedText}
      </Text>
    </View>
  )
}

export default TimeLogList
