/* @flow*/
import React from 'react'
import { Modal, View } from 'react-native'
import moment from 'moment'
import _ from 'lodash'

import BottomButtons from './BottomButtons.js'
import TimeLogList from './TimeLogList.js'
import FilterView from './FilterView.js'

import styles from './Styles/TimeLogListView.style.js'

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

  shouldComponentUpdate(nextProps) {
    if (nextProps.fromDate !== this.props.fromDate) return true
    if (nextProps.toDate !== this.props.toDate) return true
    if (nextProps.sections !== this.props.sections) return true
    if (nextProps.filterVisible !== this.props.filterVisible) return true
    return false
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      nextProps.fromDate !== this.props.fromDate ||
      nextProps.toDate !== this.props.toDate
    ) {
      this.updateListWithDate({}, nextProps.fromDate, nextProps.toDate)
    }
  }

  updateList(q) {
    const { fromDate, toDate } = this.props
    this.updateListWithDate(q, fromDate, toDate)
  }

  updateListWithDate(q, fromDate, toDate) {
    const { setSection, owner, setData } = this.props
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
    const { sections, filterVisible } = this.props
    return (
      <View style={styles.container}>
        <Modal animationType="slide" visible={filterVisible}>
          <FilterView {...this.props} />
        </Modal>
        <TimeLogList sections={sections} />
        <BottomButtons {...this.props} />
      </View>
    )
  }
}

export default TimeLogListView
