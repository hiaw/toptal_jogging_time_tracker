/* @flow*/
import React from 'react'
import { Text, View } from 'react-native'
import moment from 'moment'

import styles from './Styles/WeeklyAverageRow.style.js'

export type Props = {
  date: string,
}

const WeeklyAverageRow = (props: Props) => {
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
