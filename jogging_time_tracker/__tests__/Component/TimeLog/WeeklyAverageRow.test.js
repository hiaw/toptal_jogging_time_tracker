import 'react-native'
import React from 'react'

import WeeklyAverageRow from '../../../App/Components/TimeLog/WeeklyAverageRow.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

const noop = () => {}

it('renders correctly', () => {
  const tree = renderer
    .create(<WeeklyAverageRow distance={34.3} duration={34.3} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
