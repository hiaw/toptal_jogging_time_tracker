/* @flow*/
import React from 'react'
import { StyleSheet, SectionList, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { compose, withState } from 'recompose'
import moment from 'moment'
import _ from 'lodash'

import TimeLogRow from '../Components/TimeRow/TimeLogRow.js'
import WeeklyHeader from '../Components/TimeRow/WeeklyHeader.js'
import WeeklyAverageRow from '../Components/TimeRow/WeeklyAverageRow.js'

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'black',
  },
})

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

class TimeLogList extends React.Component {
  constructor(props) {
    super(props)

    this.timelogService = props.app.service('timelogs')

    this.updateList()

    this.timelogService.on('created', timelog => {
      this.updateList()
    })
    this.timelogService.on('removed', timelog => {
      this.updateList()
    })
    this.timelogService.on('updated', timelog => {
      this.updateList()
    })
    this.timelogService.on('patched', timelog => {
      this.updateList()
    })
  }

  updateList(q) {
    const { setSection } = this.props
    let decreasingDate = { $sort: { date: -1 } }
    let newQ = _.merge(q, { query: decreasingDate })

    this.timelogService.find(newQ).then(timelogs => {
      const newTimelogs = timelogs.data.map(timelog => ({
        ...timelog,
        week: moment(timelog.date).isoWeek(),
      }))
      const sectionsObj = _.groupBy(newTimelogs, 'week')
      const sections = Object.keys(sectionsObj).map(key => ({
        key,
        data: sectionsObj[key],
      }))
      setSection(sections)
    })
  }

  render() {
    const { sections } = this.props
    return (
      <View style={styles.container}>
        <SectionList
          keyExtractor={keyExtractor}
          renderSectionHeader={renderHeader}
          renderSectionFooter={renderFooter}
          renderItem={renderItem}
          sections={sections}
        />
      </View>
    )
  }
}

export default compose(withState('sections', 'setSection', []))(TimeLogList)
