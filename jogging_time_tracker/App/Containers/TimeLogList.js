import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import TimeLogRow from '../Components/TimeLogRow.js'
import WeeklyAverageRow from '../Components/WeeklyAverageRow.js'

const styles = StyleSheet.create({
  container: {},
})

class TimeLogList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <WeeklyAverageRow
          date={new Date()}
          duration={3722.23}
          distance={5531.32423}
        />
        <TimeLogRow
          date={new Date()}
          duration={3722.23}
          distance={5531.32423}
        />
      </View>
    )
  }
}

export default TimeLogList
