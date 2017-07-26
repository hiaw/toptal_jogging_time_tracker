import 'react-native'
import React from 'react'

import TimeLogMapView from '../../../App/Components/TimeLog/TimeLogMapView.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

jest.mock('react-native-maps')

it('renders without coordiante', () => {
  const tree = renderer.create(<TimeLogMapView />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders with coordiante', () => {
  const tree = renderer
    .create(<TimeLogMapView coordinate={{ latitude: 12, longitude: 12 }} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
