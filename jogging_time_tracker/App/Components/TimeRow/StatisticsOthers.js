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
} from '../../Helper/SpeedCalculator.js'

const moonDistance = 384000000

const StatisticOthers = props => {
  const { data } = props

  const newData = data.map(timelog => ({
    ...timelog,
    speed: timelog.distance / timelog.duration,
    day: moment(timelog.date).startOf('day'),
  }))

  const dayList = _.groupBy(newData, 'day')
  const newDayList = _.map(dayList, day => ({
    ...day,
    distance: _.sumBy(day, 'distance'),
  }))

  const greatestDistanceObj = _.maxBy(newDayList, 'distance')

  let greatestDistanceDay = 'Not Found'
  let greatestDistance = '0.00m'
  if (greatestDistanceObj && greatestDistanceObj.length > 0) {
    greatestDistanceDay = greatestDistanceObj[0].day.format('DD/MM/YYYY')
    greatestDistance = getDistanceText(greatestDistanceObj.distance)
  }

  const totalDistance = _.sumBy(newData, 'distance')
  const moonDistancePercentage = _.round(totalDistance / moonDistance * 100, 3)
  const moonDistanceText = '% Distance To Moon:'

  const cumulativeDistance = getDistanceText(totalDistance)
  const cumulativeDistanceText = 'Distance: '

  const totalTime = getDurationText(_.sumBy(newData, 'duration'))
  const totalTimeText = 'Time: '

  return (
    <View>
      <Card title="Greatest Distance Day">
        <View style={styles.row}>
          <Text>
            {greatestDistanceDay}
          </Text>
          <Text>
            {greatestDistance}
          </Text>
        </View>
      </Card>

      <Card title="Cumulative">
        <View style={styles.row}>
          <Text>
            {moonDistanceText}
          </Text>
          <Text>
            {moonDistancePercentage}
          </Text>
        </View>
        <View style={styles.row}>
          <Text>
            {cumulativeDistanceText}
          </Text>
          <Text>
            {cumulativeDistance}
          </Text>
        </View>
        <View style={styles.row}>
          <Text>
            {totalTimeText}
          </Text>
          <Text>
            {totalTime}
          </Text>
        </View>
      </Card>
    </View>
  )
}

export default StatisticOthers
