import 'react-native'
import React from 'react'
import { reduxForm } from 'redux-form'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import UserView from '../../../App/Components/User/UserView.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

const noop = () => {}

const store = createStore(() => ({}))

const Decorated = reduxForm({ form: 'user_form' })(UserView)

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

it('renders admin', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Decorated
          buttonText="Submit"
          role="admin"
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

it('renders user', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Decorated
          buttonText="Submit"
          role="user"
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

it('renders empty image', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Decorated
          buttonText="Submit"
          role="user"
          valid={false}
          newEntry={false}
          editing={false}
          alterEditing={noop}
          handleSubmit={noop}
          onSubmit={noop}
          deleteTimeLog={noop}
          cancelEditing={noop}
          imageURL=""
          uploading={true}
        />
      </Provider>,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders some image', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Decorated
          buttonText="Submit"
          role="user"
          valid={false}
          newEntry={false}
          editing={false}
          alterEditing={noop}
          handleSubmit={noop}
          onSubmit={noop}
          deleteTimeLog={noop}
          cancelEditing={noop}
          imageURL="someimage"
        />
      </Provider>,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
