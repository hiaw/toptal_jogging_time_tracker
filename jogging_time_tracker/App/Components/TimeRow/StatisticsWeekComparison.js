/* @flow*/
import React from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import moment from 'moment'
import _ from 'lodash'

import styles from './Styles/StatisticsView.style.js'

import {
  getDistanceText,
  getDurationText,
  getSpeedText,
} from '../../Helper/SpeedCalculator.js'

const StatisticWeekComparison = props => {
  const { data } = props

  const newData = data.map(timelog => ({
    ...timelog,
    week: moment(timelog.date).isoWeek(),
  }))

  const weekList = _.groupBy(newData, 'week')

  const thisWeek = weekList[moment().isoWeek()]

  const lastWeek = weekList[moment().subtract(7, 'days').isoWeek()]

  const lastWeekDistance = _.sumBy(lastWeek, 'distance')
  const lastWeekDistanceText = getDistanceText(lastWeekDistance)
  const lastWeekDuration = _.sumBy(lastWeek, 'duration')
  const lastWeekDurationText = getDurationText(lastWeekDuration)
  const lastWeekSpeedText = getSpeedText(lastWeekDistance, lastWeekDuration)

  const thisWeekDistance = _.sumBy(thisWeek, 'distance')
  const thisWeekDistanceText = getDistanceText(thisWeekDistance)
  const thisWeekDuration = _.sumBy(thisWeek, 'duration')
  const thisWeekDurationText = getDurationText(thisWeekDuration)
  const thisWeekSpeedText = getSpeedText(thisWeekDistance, thisWeekDuration)

  return (
    <Card title="Last Week Comparison">
      <View style={styles.row}>
        <View>
          <Text />
          <Text>Distance</Text>
          <Text>Duration</Text>
          <Text>Speed</Text>
        </View>

        <View>
          <Text>Last Week</Text>
          <Text>
            {lastWeekDistanceText}
          </Text>
          <Text>
            {lastWeekDurationText}
          </Text>
          <Text>
            {lastWeekSpeedText}
          </Text>
        </View>

        <View>
          <Text>This Week</Text>
          <Text>
            {thisWeekDistanceText}
          </Text>
          <Text>
            {thisWeekDurationText}
          </Text>
          <Text>
            {thisWeekSpeedText}
          </Text>
        </View>
      </View>
    </Card>
  )
}

export default StatisticWeekComparison
