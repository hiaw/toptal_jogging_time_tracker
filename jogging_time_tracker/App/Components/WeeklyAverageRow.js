/* @flow*/
import React from 'react'
import { Text, View } from 'react-native'

import { getDistanceText, getSpeedText } from '../Helper/SpeedCalculator.js'

import styles from './Styles/WeeklyAverageRow.style.js'

export type Props = {
  distance: number,
  duration: number,
}

const WeeklyAverageRow = props => {
  const { distance, duration } = props
  const distanceText = getDistanceText(distance)
  const speedText = getSpeedText(distance, duration)

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Total: {distanceText}
      </Text>
      <Text style={styles.welcome}>
        Avg: {speedText}
      </Text>
    </View>
  )
}

export default WeeklyAverageRow
