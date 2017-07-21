import 'react-native'
import React from 'react'

import WeeklyHeader from '../../../App/Components/TimeLog/WeeklyHeader.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

const noop = () => {}

it('renders correctly', () => {
  const tree = renderer
    .create(<WeeklyHeader date="2017-06-23T04:51:34.022Z" />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
