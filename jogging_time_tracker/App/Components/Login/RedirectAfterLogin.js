import { Actions } from 'react-native-router-flux'

export default function redirectAfterLogin(res) {
  let roles = res.data.roles
  if (roles) {
    if (roles.indexOf('admin') >= 0) {
      Actions.userAndExpenseList({ role: 'admin', title: 'Admin' })
    } else if (roles.indexOf('manager') >= 0) {
      Actions.userAndExpenseList({ role: 'manager', title: 'Manager' })
    } else {
      Actions.expensesList()
    }
  } else {
    Actions.expensesList()
  }
}
