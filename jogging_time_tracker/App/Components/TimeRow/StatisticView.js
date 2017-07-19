/* @flow*/
import React from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import moment from 'moment'
import _ from 'lodash'

/* import styles from './Styles/StatisticView.style.js'*/
import {
  getDistanceText,
  getDurationText,
  getSpeedText,
} from '../../Helper/SpeedCalculator.js'

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 20,
  },
})

const moonDistance = 384000000

const StatisticView = props => {
  const { data } = props

  const newData = data.map(timelog => ({
    ...timelog,
    speed: timelog.distance / timelog.duration,
    day: moment(timelog.date).startOf('day'),
    week: moment(timelog.date).isoWeek(),
    month: moment(timelog.date).startOf('month'),
    year: moment(timelog.date).startOf('year'),
  }))

  const dayList = _.groupBy(newData, 'day')
  const weekList = _.groupBy(newData, 'week')
  const monthList = _.groupBy(newData, 'month')
  const yearList = _.groupBy(newData, 'year')

  const fastestJogWeek = ''
  const fastestJogMonth = ''
  const fastestJogYear = ''

  const weekFastestJogRecordText = `Week: `
  const monthFastestJogRecordText = `Month: `
  const yearFastestJogRecordText = `Year: `

  const weekSlowestJogRecordText = `Week: `
  const monthSlowestJogRecordText = `Month: `
  const yearSlowestJogRecordText = `Year: `

  console.log(dayList)
  const newDayList = _.map(dayList, day => ({
    ...day,
    distance: _.sumBy(day, 'distance'),
  }))

  const greatestDistanceObj = _.maxBy(newDayList, 'distance')
  const greatestDistanceDay = greatestDistanceObj[0].day.format('DD/MM/YYYY')
  const greatestDistance = getDistanceText(greatestDistanceObj.distance)
  const greatestDistanceDayText = `${greatestDistanceDay}: ${greatestDistance}`

  const lastWeekComparison = `Last Week`

  const totalDistance = _.sumBy(newData, 'distance')
  const moodDistancePercentage = _.round(totalDistance / moonDistance * 100, 3)
  const moonDistanceText = `% Distance To Moon: ${moodDistancePercentage}%`

  const cumulativeDistance = getDistanceText(totalDistance)
  const cumulativeDistanceText = 'Distance: ' + cumulativeDistance

  const totalTime = getDurationText(_.sumBy(newData, 'duration'))
  const totalTimeText = 'Time: ' + totalTime

  /* const dateText = moment(date).format('DD/MM/YYYY')
   * const distanceText = getDistanceText(distance)
   * const durationText = getDurationText(duration)
   * const speedText = getSpeedText(distance, duration)
   */
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card title="Fastest Jog">
        <Text>
          {weekFastestJogRecordText}
        </Text>
        <Text>
          {monthFastestJogRecordText}
        </Text>
        <Text>
          {yearFastestJogRecordText}
        </Text>
      </Card>

      <Card title="Slowest Jog">
        <Text>
          {weekSlowestJogRecordText}
        </Text>
        <Text>
          {monthSlowestJogRecordText}
        </Text>
        <Text>
          {yearSlowestJogRecordText}
        </Text>
      </Card>

      <Card title="Greatest Distance Day">
        <Text>
          {greatestDistanceDayText}
        </Text>
      </Card>

      <Card title="Last Week Comparison">
        <Text>
          {lastWeekComparison}
        </Text>
      </Card>

      <Card title="Cumulative">
        <Text>
          {moonDistanceText}
        </Text>
        <Text>
          {cumulativeDistanceText}
        </Text>
        <Text>
          {totalTimeText}
        </Text>
      </Card>
    </ScrollView>
  )
}

export default StatisticView
