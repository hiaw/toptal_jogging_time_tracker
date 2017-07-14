import React from 'react'
import { StyleSheet, FlatList, SectionList, Text, View } from 'react-native'
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

const genData = startWeek => {
  const arr = []
  for (let i = 0; i < 10; i++) {
    const day = Math.round(Math.random() * 7)
    const seconds = Math.round(Math.random() * 60)
    const date = moment(startWeek)
      .subtract(day, 'days')
      .subtract(seconds, 'seconds')
    const duration = Math.random() * 1000
    const distance = Math.random() * 10000
    arr.push({ date, duration, distance })
  }
  return _.sortBy(arr, ['date'])
}

const renderHeader = ({ section }) =>
  <WeeklyAverageRow
    date={new Date()}
    duration={3722.23}
    distance={5531.32423}
  />

const renderItem = ({ item }) =>
  <TimeLogRow
    date={item.date}
    duration={item.duration}
    distance={item.distance}
  />

class TimeLogList extends React.Component {
  render() {
    const sections = [
      {
        data: genData(moment().startOf('ISOWeek')),
        title: 'test',
      },
    ]
    console.log(sections)
    return (
      <View style={styles.container}>
        <WeeklyAverageRow
          date={new Date()}
          duration={3722.23}
          distance={5531.32423}
        />
        <FlatList data={genData()} renderItem={renderItem} />
      </View>
    )
  }
}

export default TimeLogList

/* <SectionList
 *   renderHeader={renderHeader}
 *   renderItem={renderItem}
 *   section={sections}
 * />*/
