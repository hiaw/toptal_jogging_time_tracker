import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import moment from 'moment'
import _ from 'lodash'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

const MINUTE_PER_HOUR = 3600

const getSpeedText = (distance, duration) => {
  const kms = distance / 1000
  const hours = duration / MINUTE_PER_HOUR
  const speed = _.round(kms / hours, 2)
  const speedText = `${speed} km/h`
  return speedText
}

const TimeLogList = props => {
  const { date, distance, duration } = props
  const dateText = `Week ${moment(date).isoWeek()}, ${moment(date).year()}`
  const speedText = getSpeedText(distance, duration)

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        {dateText}
      </Text>
      <Text style={styles.welcome}>
        {speedText}
      </Text>
    </View>
  )
}

export default TimeLogList
