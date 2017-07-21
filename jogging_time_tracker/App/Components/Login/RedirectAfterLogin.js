/* @flow*/
import { Actions, ActionConst } from 'react-native-router-flux'

export default function redirectAfterLogin(res: any) {
  let roles = res.data.roles
  if (roles) {
    if (roles.indexOf('admin') >= 0) {
      Actions.usersList({ role: 'admin', title: 'Admin' })
    } else if (roles.indexOf('manager') >= 0) {
      Actions.usersList({ role: 'manager', title: 'Manager' })
    } else {
      Actions.timelogs({ owner: res.data._id })
    }
  } else {
    Actions.timelogs({ owner: res.data._id })
  }
}
