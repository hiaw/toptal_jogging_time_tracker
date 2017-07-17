import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import moment from 'moment'

import styles from './Styles/TimeLogRow.style.js'
import {
  getDistanceText,
  getDurationText,
  getSpeedText,
} from '../Helper/SpeedCalculator.js'

const TimeLogView = props => {
  const { item: { date, distance, duration }, onPress } = props
  const dateText = moment(date).format('DD/MM/YYYY')
  const distanceText = getDistanceText(distance)
  const durationText = getDurationText(duration)
  const speedText = getSpeedText(distance, duration)
  return (
    <View>
      <Text style={styles.welcome}>
        {dateText}
      </Text>
      <Text style={styles.welcome}>
        {speedText}
      </Text>
      <Text style={styles.welcome}>
        {distanceText}
      </Text>
      <Text style={styles.duration}>
        {durationText}
      </Text>
    </View>
  )
}

export default TimeLogView
