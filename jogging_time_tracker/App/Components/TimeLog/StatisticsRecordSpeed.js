/* @flow*/
import React from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import moment from 'moment'
import _ from 'lodash'

import { formatSpeed } from '../../Helper/SpeedCalculator.js'
import styles from './Styles/StatisticsView.style.js'

const StatisticsRecordSpeed = props => {
  const { data } = props

  const newData = data.map(timelog => ({
    ...timelog,
    speed: timelog.distance / timelog.duration,
    day: moment(timelog.date).startOf('day'),
    week: moment(timelog.date).isoWeek(),
    month: moment(timelog.date).startOf('month'),
    year: moment(timelog.date).startOf('year'),
  }))

  const weekList = _.groupBy(newData, 'week')
  const monthList = _.groupBy(newData, 'month')
  const yearList = _.groupBy(newData, 'year')

  const thisWeek = weekList[moment().isoWeek()]
  const thisMonth = monthList[moment().startOf('month')]
  const thisYear = yearList[moment().startOf('year')]

  const weekFastest =
    thisWeek && thisWeek.length > 0 ? _.maxBy(thisWeek, 'speed').speed : 0
  const weekFastestText = formatSpeed(weekFastest)
  const monthFastest =
    thisMonth && thisMonth.length > 0 ? _.maxBy(thisMonth, 'speed').speed : 0
  const monthFastestText = formatSpeed(monthFastest)
  const yearFastest =
    thisYear && thisYear.length > 0 ? _.maxBy(thisYear, 'speed').speed : 0
  const yearFastestText = formatSpeed(yearFastest)

  const weekSlowest =
    thisWeek && thisWeek.length > 0 ? _.minBy(thisWeek, 'speed').speed : 0
  const weekSlowestText = formatSpeed(weekSlowest)
  const monthSlowest =
    thisMonth && thisMonth.length > 0 ? _.minBy(thisMonth, 'speed').speed : 0
  const monthSlowestText = formatSpeed(monthSlowest)
  const yearSlowest =
    thisYear && thisYear.length > 0 ? _.minBy(thisYear, 'speed').speed : 0
  const yearSlowestText = formatSpeed(yearSlowest)

  return (
    <Card title="Record Speed">
      <View style={styles.row}>
        <View>
          <Text />
          <Text>This Week</Text>
          <Text>This Month</Text>
          <Text>This Year</Text>
        </View>
        <View>
          <Text>Fastest</Text>
          <Text>
            {weekFastestText}
          </Text>
          <Text>
            {monthFastestText}
          </Text>
          <Text>
            {yearFastestText}
          </Text>
        </View>

        <View>
          <Text>Slowest</Text>
          <Text>
            {weekSlowestText}
          </Text>
          <Text>
            {monthSlowestText}
          </Text>
          <Text>
            {yearSlowestText}
          </Text>
        </View>
      </View>
    </Card>
  )
}

export default StatisticsRecordSpeed
