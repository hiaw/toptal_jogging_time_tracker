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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

  const lastWeek = weekList[moment().subtract(7, 'days').isoWeek()]
  const thisWeek = weekList[moment().isoWeek()]

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

  const dayList = _.groupBy(newData, 'day')
  const newDayList = _.map(dayList, day => ({
    ...day,
    distance: _.sumBy(day, 'distance'),
  }))

  const greatestDistanceObj = _.maxBy(newDayList, 'distance')
  const greatestDistanceDay = greatestDistanceObj[0].day.format('DD/MM/YYYY')
  const greatestDistance = getDistanceText(greatestDistanceObj.distance)

  const totalDistance = _.sumBy(newData, 'distance')
  const moonDistancePercentage = _.round(totalDistance / moonDistance * 100, 3)
  const moonDistanceText = '% Distance To Moon:'

  const cumulativeDistance = getDistanceText(totalDistance)
  const cumulativeDistanceText = 'Distance: '

  const totalTime = getDurationText(_.sumBy(newData, 'duration'))
  const totalTimeText = 'Time: '

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card title="Record Speed">
        <View style={styles.row}>
          <View>
            <Text />
            <Text>Week</Text>
            <Text>Month</Text>
            <Text>Year</Text>
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
    </ScrollView>
  )
}

export default StatisticView
