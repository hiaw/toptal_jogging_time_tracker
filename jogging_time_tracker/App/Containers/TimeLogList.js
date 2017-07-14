import React from 'react'
import { StyleSheet, SectionList, View } from 'react-native'
import moment from 'moment'
import _ from 'lodash'

import TimeLogRow from '../Components/TimeLogRow.js'
import WeeklyAverageRow from '../Components/WeeklyAverageRow.js'

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'black',
  },
})

const genData = startOfWeek => {
  const arr = []
  const num = Math.round(Math.random() * 5) + 1
  for (let i = 0; i < num; i++) {
    const day = Math.round(Math.random() * 7)
    const seconds = Math.round(Math.random() * 60)
    const date = moment(startOfWeek)
      .subtract(day, 'days')
      .subtract(seconds, 'seconds')
    const duration = Math.random() * 1000
    const distance = Math.random() * 10000
    arr.push({ date, duration, distance })
  }
  return _.sortBy(arr, ['date'])
}

const renderHeader = ({ section }) => {
  const date = section.data[0].date
  const duration = _.sumBy(section.data, 'duration')
  const distance = _.sumBy(section.data, 'distance')
  return (
    <WeeklyAverageRow date={date} duration={duration} distance={distance} />
  )
}

const renderItem = ({ item }) =>
  <TimeLogRow
    key={item.distance}
    date={item.date}
    duration={item.duration}
    distance={item.distance}
  />

const keyExtractor = item => item.distance

class TimeLogList extends React.Component {
  render() {
    const thisDate = moment().startOf('ISOWeek')
    const sections = [
      {
        data: genData(thisDate.subtract(7, 'days')),
        title: 'test2',
        key: 'test2',
      },
      {
        data: genData(thisDate),
        title: 'test',
        key: 'test',
      },
    ]
    console.log(sections)
    return (
      <View style={styles.container}>
        <SectionList
          keyExtractor={keyExtractor}
          renderSectionHeader={renderHeader}
          renderItem={renderItem}
          sections={sections}
        />
      </View>
    )
  }
}

export default TimeLogList
