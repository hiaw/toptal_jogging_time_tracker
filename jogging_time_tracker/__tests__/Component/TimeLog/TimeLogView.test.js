import 'react-native'
import React from 'react'
import { reduxForm } from 'redux-form'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import TimeLogView from '../../../App/Components/TimeRow/TimeLogView.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

const noop = () => {}

const store = createStore(() => ({}))

const Decorated = reduxForm({
  form: 'time_log_form',
  initialValues: {
    date: new Date(),
  },
})(TimeLogView)

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Decorated
        buttonText="Submit"
        valid={true}
        newEntry={true}
        editing={true}
        alterEditing={noop}
        handleSubmit={noop}
        onSubmit={noop}
        deleteTimeLog={noop}
        cancelEditing={noop}
      />
    </Provider>,
  )
})

/* it('renders invalid', () => {
 *   const tree = renderer.create(
 *     <Provider store={store}>
 *       <Decorated
 *         buttonText="Submit"
 *         valid={false}
 *         newEntry={true}
 *         editing={true}
 *         alterEditing={noop}
 *         handleSubmit={noop}
 *         onSubmit={noop}
 *         deleteTimeLog={noop}
 *         cancelEditing={noop}
 *       />
 *     </Provider>,
 *   )
 * })*/
