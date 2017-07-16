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
    const { sections } = this.props
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
