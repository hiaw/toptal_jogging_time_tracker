import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  firstRow: {
    justifyContent: 'space-between',
  },
  secondRow: {
    justifyContent: 'flex-start',
  },
  welcome: {
    fontSize: 20,
  },
  duration: {
    fontSize: 20,
    marginLeft: 50,
  },
})
