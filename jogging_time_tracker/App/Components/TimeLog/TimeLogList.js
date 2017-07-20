/* @flow*/
import React from 'react'
import { SectionList } from 'react-native'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash'

import TimeLogRow from './TimeLogRow.js'
import WeeklyHeader from './WeeklyHeader.js'
import WeeklyAverageRow from './WeeklyAverageRow.js'

const renderHeader = ({ section }) => {
  const date = section.data[0].date
  return <WeeklyHeader date={date} />
}

const renderFooter = ({ section }) => {
  const duration = _.sumBy(section.data, 'duration')
  const distance = _.sumBy(section.data, 'distance')
  return <WeeklyAverageRow duration={duration} distance={distance} />
}

const renderItem = ({ item }) =>
  <TimeLogRow
    key={item.distance}
    date={item.date}
    duration={item.duration}
    distance={item.distance}
    onPress={() =>
      Actions.timelog({ item, title: `ID: ${item._id}`, newEntry: false })}
  />

const keyExtractor = item => item._id

const TimeLogList = props => {
  const { sections } = props
  return (
    <SectionList
      keyExtractor={keyExtractor}
      renderSectionHeader={renderHeader}
      renderSectionFooter={renderFooter}
      renderItem={renderItem}
      sections={sections}
    />
  )
}

export default TimeLogList
