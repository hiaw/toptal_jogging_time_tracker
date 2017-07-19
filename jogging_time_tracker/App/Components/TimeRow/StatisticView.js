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
    marginTop: 60,
  },
})

export type Props = {
  date: string,
  distance: number,
  duration: number,
  onPress: () => mixed,
}

const StatisticView = (props: Props) => {
  const { data, onPress } = props
  console.log(data)

  const newData = data.map(timelog => ({
    ...timelog,
    speed: timelog.distance / timelog.duration,
  }))

  const fastestJogWeek = ''
  const fastestJogMonth = ''
  const fastestJogYear = ''

  const weekFastestJogRecordText = `Week: `
  const monthFastestJogRecordText = `Month: `
  const yearFastestJogRecordText = `Year: `

  const weekSlowestJogRecordText = `Week: `
  const monthSlowestJogRecordText = `Month: `
  const yearSlowestJogRecordText = `Year: `

  const greatestDistanceDay = `Greatest`

  const lastWeekComparison = `Last Week`

  const cumulativeDistance = getDistanceText(_.sumBy(newData, 'distance'))
  const cumulativeDistanceText = 'Distance: ' + cumulativeDistance
  const totalTime = getDurationText(_.sumBy(newData, 'duration'))
  const totalTimeText = 'Time: ' + totalTime

  /* const dateText = moment(date).format('DD/MM/YYYY')
   * const distanceText = getDistanceText(distance)
   * const durationText = getDurationText(duration)
   * const speedText = getSpeedText(distance, duration)
   */
  return (
    <ScrollView style={styles.container}>
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
          {greatestDistanceDay}
        </Text>
      </Card>

      <Card title="Last Week Comparison">
        <Text>
          {lastWeekComparison}
        </Text>
      </Card>

      <Card title="Cumulative">
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
