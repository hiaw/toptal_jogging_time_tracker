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

  const weekFastestJogRecordText = formatSpeed(_.maxBy(thisWeek, 'speed').speed)
  const monthFastestJogRecordText = formatSpeed(
    _.maxBy(thisMonth, 'speed').speed,
  )
  const yearFastestJogRecordText = formatSpeed(_.maxBy(thisYear, 'speed').speed)

  const weekSlowestJogRecordText = formatSpeed(_.minBy(thisWeek, 'speed').speed)
  const monthSlowestJogRecordText = formatSpeed(
    _.minBy(thisMonth, 'speed').speed,
  )
  const yearSlowestJogRecordText = formatSpeed(_.minBy(thisYear, 'speed').speed)

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
            {weekFastestJogRecordText}
          </Text>
          <Text>
            {monthFastestJogRecordText}
          </Text>
          <Text>
            {yearFastestJogRecordText}
          </Text>
        </View>

        <View>
          <Text>Slowest</Text>
          <Text>
            {weekSlowestJogRecordText}
          </Text>
          <Text>
            {monthSlowestJogRecordText}
          </Text>
          <Text>
            {yearSlowestJogRecordText}
          </Text>
        </View>
      </View>
    </Card>
  )
}

export default StatisticsRecordSpeed
