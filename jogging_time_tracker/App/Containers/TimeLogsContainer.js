/* @flow*/
import { compose, withState, withHandlers } from 'recompose'
import { Actions } from 'react-native-router-flux'
import { reduxForm } from 'redux-form'
import moment from 'moment'

import TimeLogList from '../Components/TimeLog/TimeLogList.js'

export default compose(
  withState('sections', 'setSection', []),
  withState('data', 'setData', []),
  withState('filterVisible', 'setFilterVisible', false),
  withState('fromDate', 'setFromDate', moment('2017-07-10').valueOf()),
  withState('toDate', 'setToDate', moment().valueOf()),
  withHandlers({
    openFilter: ({ setFilterVisible }) => () => {
      setFilterVisible(true)
    },
    closeFilter: ({ setFilterVisible }) => () => {
      setFilterVisible(false)
    },
    addTimeLog: () => () => {
      Actions.timelog({ newEntry: true })
    },
    openStatistics: ({ data }) => () => {
      Actions.statistics({ data })
    },
  }),
  reduxForm({
    form: 'filter_form',
    onSubmitFail: (errors, dispatch, submitError) => {
      console.log(submitError)
      console.log(errors)
    },
    initialValues: {
      fromDate: new Date(0),
      toDate: new Date(),
    },
  }),
)(TimeLogList)
