/* @flow*/
import React from 'react'
import { StyleSheet, View } from 'react-native'
import moment from 'moment'
import _ from 'lodash'

import BottomButtons from './BottomButtons.js'
import TimeLogList from './TimeLogList.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'black',
  },
})

class TimeLogListView extends React.Component {
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
    const { setSection, owner, setData, fromDate, toDate } = this.props
    let decreasingDate = {
      $sort: { date: -1 },
      date: { $gte: fromDate, $lte: toDate },
    }
    if (owner) {
      decreasingDate.owner = owner
    }
    let newQ = _.merge(q, { query: decreasingDate })

    this.timelogService.find(newQ).then(timelogs => {
      setData(timelogs.data)
      const newTimelogs = timelogs.data.map(timelog => ({
        ...timelog,
        week: moment(timelog.date).isoWeek(),
      }))
      const sectionsObj = _.groupBy(newTimelogs, 'week')
      const sections = Object.keys(sectionsObj).map(key => ({
        key,
        data: sectionsObj[key],
      }))
      setSection(sections.reverse())
    })
  }

  render() {
    const { sections } = this.props
    return (
      <View style={styles.container}>
        <TimeLogList sections={sections} />
        <BottomButtons {...this.props} />
      </View>
    )
  }
}

export default TimeLogListView
