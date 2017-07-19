/* @flow*/
import { Actions, ActionConst } from 'react-native-router-flux'

export default function redirectAfterLogin(res: any) {
  let roles = res.data.roles
  if (roles) {
    if (roles.indexOf('admin') >= 0) {
      Actions.usersList({ role: 'admin', title: 'Admin' })
    } else if (roles.indexOf('manager') >= 0) {
      Actions.userAndTimelogs({ role: 'manager', title: 'Manager' })
    } else {
      Actions.timelogs()
    }
  } else {
    Actions.timelogs()
  }
}
