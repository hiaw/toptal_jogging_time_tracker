import 'react-native'
import React from 'react'
import { reduxForm } from 'redux-form'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import TimeLogView from '../../../App/Components/TimeLog/TimeLogView.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

jest.mock('react-native-modal-datetime-picker')

const noop = () => {}

const store = createStore(() => ({}))

const Decorated = reduxForm({
  form: 'time_log_form',
  initialValues: {
    date: new Date(),
  },
})(TimeLogView)

it('renders correctly', () => {
  const tree = renderer
    .create(
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
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders invalid', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Decorated
          buttonText="Submit"
          valid={false}
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
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders not editing', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Decorated
          buttonText="Submit"
          valid={false}
          newEntry={false}
          editing={false}
          alterEditing={noop}
          handleSubmit={noop}
          onSubmit={noop}
          deleteTimeLog={noop}
          cancelEditing={noop}
        />
      </Provider>,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
