/* @flow*/
import React from 'react'
import { Button, View } from 'react-native'

export type Props = {
  openFilter: () => mixed,
  addTimeLog: () => mixed,
  openProfile: () => mixed,
  openStatistics: () => mixed,
  owner: string,
}

const BottomButtons = (props: Props) => {
  const { openFilter, addTimeLog, openProfile, openStatistics, owner } = props
  return (
    <View>
      <Button onPress={openFilter} title="Filter" />
      <Button onPress={addTimeLog} title="Add Time Log" />
      <Button onPress={openProfile} title="Open Profile" />
      <Button onPress={openStatistics} title="Open Statistics" />
    </View>
  )
}

export default BottomButtons
