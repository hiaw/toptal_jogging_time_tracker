import React from 'react'
import { Text, View } from 'react-native'
import moment from 'moment'

import styles from './Styles/WeeklyAverageRow.style.js'

const WeeklyAverageRow = props => {
  const { date } = props
  const dateText = `Week ${moment(date).isoWeek()}, ${moment(date).year()}`

  return (
    <View style={[styles.container, styles.header]}>
      <Text style={styles.welcome}>
        {dateText}
      </Text>
    </View>
  )
}

export default WeeklyAverageRow
