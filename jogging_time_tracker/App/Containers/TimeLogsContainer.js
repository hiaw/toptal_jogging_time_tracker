/* @flow*/
import { compose, withState, withHandlers } from 'recompose'
import { Actions } from 'react-native-router-flux'
import { reduxForm } from 'redux-form'
import moment from 'moment'

import TimeLogListView from '../Components/TimeLog/TimeLogListView.js'

export default compose(
  withState('sections', 'setSection', []),
  withState('data', 'setData', []),
  withState('filterVisible', 'setFilterVisible', false),
  withState('fromDate', 'setFromDate', moment(0).valueOf()),
  withState('toDate', 'setToDate', moment().valueOf()),
  withHandlers({
    openFilter: ({ setFilterVisible }) => () => {
      setFilterVisible(true)
    },
    closeFilter: ({ setFilterVisible }) => () => {
      setFilterVisible(false)
    },
    addTimeLog: ({ owner }) => () => {
      Actions.timelog({ newEntry: true, owner: owner })
    },
    openStatistics: ({ data }) => () => {
      Actions.statistics({ data })
    },
  }),
  withHandlers({
    onSubmit: props => values => {
      const { fromDateValue, toDateValue } = values
      const { setFromDate, setToDate, closeFilter } = props
      setFromDate(fromDateValue.valueOf())
      setToDate(toDateValue.valueOf())
      closeFilter()
    },
  }),
  reduxForm({
    form: 'filter_form',
    onSubmitFail: (errors, dispatch, submitError) => {
      console.log(submitError)
      console.log(errors)
    },
    initialValues: {
      fromDateValue: new Date('2017-06-01'),
      toDateValue: new Date(),
    },
  }),
)(TimeLogListView)
