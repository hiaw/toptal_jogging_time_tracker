/* @flow*/
import React from 'react'
import { Button, View } from 'react-native'

export type Props = {
  openFilter: () => mixed,
  addTimeLog: () => mixed,
  openStatistics: () => mixed,
}

const BottomButtons = (props: Props) => {
  const { openFilter, addTimeLog, openStatistics } = props
  return (
    <View>
      <Button onPress={openFilter} title="Filter" />
      <Button onPress={addTimeLog} title="Add Time Log" />
      <Button onPress={openStatistics} title="Open Statistics" />
    </View>
  )
}

export default BottomButtons
