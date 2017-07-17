import { Actions, ActionConst } from 'react-native-router-flux'

export default function redirectAfterLogin(res) {
  /* let roles = res.data.roles
   * if (roles) {
   *   if (roles.indexOf('admin') >= 0) {
   *     Actions.userAndExpenseList({ role: 'admin', title: 'Admin' })
   *   } else if (roles.indexOf('manager') >= 0) {
   *     Actions.userAndExpenseList({ role: 'manager', title: 'Manager' })
   *   } else {
   *     Actions.timelogs()
   *   }
   * } else {*/
  Actions.timelogs({ type: ActionConst.RESET })
  /* }*/
}
