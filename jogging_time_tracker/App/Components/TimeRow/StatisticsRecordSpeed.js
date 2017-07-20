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

  const weekFastest = formatSpeed(_.maxBy(thisWeek, 'speed').speed)
  const monthFastest = formatSpeed(_.maxBy(thisMonth, 'speed').speed)
  const yearFastest = formatSpeed(_.maxBy(thisYear, 'speed').speed)

  const weekSlowest = formatSpeed(_.minBy(thisWeek, 'speed').speed)
  const monthSlowest = formatSpeed(_.minBy(thisMonth, 'speed').speed)
  const yearSlowest = formatSpeed(_.minBy(thisYear, 'speed').speed)

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
            {weekFastest}
          </Text>
          <Text>
            {monthFastest}
          </Text>
          <Text>
            {yearFastest}
          </Text>
        </View>

        <View>
          <Text>Slowest</Text>
          <Text>
            {weekSlowest}
          </Text>
          <Text>
            {monthSlowest}
          </Text>
          <Text>
            {yearSlowest}
          </Text>
        </View>
      </View>
    </Card>
  )
}

export default StatisticsRecordSpeed
