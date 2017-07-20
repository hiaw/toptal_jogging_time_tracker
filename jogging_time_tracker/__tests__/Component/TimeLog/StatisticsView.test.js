import 'react-native'
import React from 'react'

import StatisticsView from '../../../App/Components/TimeRow/StatisticsView.js'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

const noop = () => {}

const data = []

it('renders empty array', () => {
  const tree = renderer.create(<StatisticsView data={data} />).toJSON()
  expect(tree).toMatchSnapshot()
})

Date.now = jest.fn(() => 1487076708000) //14.02.2017

const newData = [
  { date: '2017-02-01T08:47:26.504Z', distance: 840.11, duration: 30.84 },
  { date: '2017-02-09T08:46:59.508Z', distance: 5488.61, duration: 781.28 },
  { date: '2017-02-13T08:47:15.508Z', distance: 5100.16, duration: 632.35 },
]

it('renders empty array', () => {
  const tree = renderer.create(<StatisticsView data={newData} />).toJSON()
  expect(tree).toMatchSnapshot()
})
