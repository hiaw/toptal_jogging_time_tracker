/* @flow */
import React from 'react'
import MapView from 'react-native-maps'

const styles = {
  map: {
    height: 400,
    width: 400,
  },
}

const TimeLogMapView = (props: NewProps) => {
  const { coordinate } = props

  const latitudeDelta = 0.1
  const longitudeDelta = 0.1

  if (coordinate && coordinate.latitude && coordinate.longitude) {
    const { latitude, longitude } = coordinate
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta,
        }}
      >
        <MapView.Marker coordinate={coordinate} />
      </MapView>
    )
  }

  return null
}

export default TimeLogMapView
