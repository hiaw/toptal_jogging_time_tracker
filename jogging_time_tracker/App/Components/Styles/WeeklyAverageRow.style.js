import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'aliceblue',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
  },
  header: {
    backgroundColor: 'cornsilk',
  },
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
