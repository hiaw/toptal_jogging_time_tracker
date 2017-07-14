import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import TimeLogRow from '../Components/TimeLogRow.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})

class TimeLogList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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
