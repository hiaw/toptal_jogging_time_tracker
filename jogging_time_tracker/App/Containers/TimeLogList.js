import React from 'react'
import { StyleSheet, FlatList, SectionList, Text, View } from 'react-native'
import moment from 'moment'

import TimeLogRow from '../Components/TimeLogRow.js'
import WeeklyAverageRow from '../Components/WeeklyAverageRow.js'

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'black',
  },
})

const genData = () => {
  const arr = []
  for (let i = 0; i < 10; i++) {
    const day = Math.round(Math.random * 7)
    const date = moment().subtract(day, 'days')
    const duration = Math.random() * 1000
    const distance = Math.random() * 10000
    arr.push({ date, duration, distance })
  }
  return arr
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
        data: genData(),
        title: 'test',
      },
    ]
    console.log(sections)
    return (
      <View style={styles.container}>
        <FlatList data={genData()} renderItem={renderItem} />
        <WeeklyAverageRow
          date={new Date()}
          duration={3722.23}
          distance={5531.32423}
        />
        <TimeLogRow
          date={new Date()}
          duration={3722.23}
          distance={5531.32423}
        />
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
