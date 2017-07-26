/* @flow*/
import React from 'react'
import { ScrollView } from 'react-native'

import StatisticsRecordSpeed from './StatisticsRecordSpeed.js'
import StatisticsWeeklyComparison from './StatisticsWeekComparison.js'
import StatisticsOthers from './StatisticsOthers.js'

import styles from './Styles/StatisticsView.style.js'

const StatisticView = props => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatisticsRecordSpeed {...props} />

      <StatisticsWeeklyComparison {...props} />

      <StatisticsOthers {...props} />
    </ScrollView>
  )
}

export default StatisticView
