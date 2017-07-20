/* @flow*/
import { compose, withState } from 'recompose'
import moment from 'moment'

import TimeLogList from '../Components/TimeLog/TimeLogList.js'

export default compose(
  withState('sections', 'setSection', []),
  withState('data', 'setData', []),
  withState('fromDate', 'setFromDate', moment('2017-07-10').valueOf()),
  withState('toDate', 'setToDate', moment().valueOf()),
)(TimeLogList)
