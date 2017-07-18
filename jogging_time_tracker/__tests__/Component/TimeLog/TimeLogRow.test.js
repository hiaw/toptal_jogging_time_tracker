import 'react-native'
import React from 'react'

import TimeLogRow from '../../../App/Components/TimeRow/TimeLogRow.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

const noop = () => {}

it('renders correctly', () => {
  const tree = renderer
    .create(
      <TimeLogRow
        date="2017-06-23T04:51:34.022Z"
        distance={1034.3}
        duration={34.3}
        onPress={noop}
      />,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
