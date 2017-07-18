import 'react-native'
import React from 'react'
import { reduxForm } from 'redux-form'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import LoginView from '../../../App/Components/Login/LoginView.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

const noop = () => {}

const store = createStore(() => ({}))

const Decorated = reduxForm({ form: 'testForm' })(LoginView)

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Decorated
          handleSubmit={noop}
          alterRegistered={noop}
          buttonText="Register"
          alternateButtonText="Already Registered"
          valid={true}
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
          handleSubmit={noop}
          alterRegistered={noop}
          buttonText="Register"
          alternateButtonText="Already Registered"
          valid={false}
        />
      </Provider>,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
