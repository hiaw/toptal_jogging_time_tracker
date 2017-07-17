import React, { Component } from 'react'
import { Actions, Scene, Router } from 'react-native-router-flux'

// Containers
import LoginContainer from '../Containers/LoginContainer.js'
import TimeLogEditor from '../Containers/TimeLogEditor.js'
import TimeLogList from '../Containers/TimeLogList.js'

/* import ExpensesList from '../Components/Expenses/ExpensesList.js'
 * import ExpenseView from '../Components/Expenses/ExpenseView.js'
 * import UsersList from '../Components/Users/UsersList.js'
 * import UserPage from '../Components/Users/UserPage.js'
 * import UsersExpensesList from '../Components/Users/UsersExpensesList.js'
 * import WeekView from '../Components/Expenses/WeekView.js'
 * import FilterView from '../Components/Expenses/FilterView.js'
 * */
export default class NavigationRouter extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            app={this.props.app}
            key="login"
            component={LoginContainer}
            hideNavBar
          />
          <Scene
            app={this.props.app}
            key="timelogs"
            title="Time Logs"
            component={TimeLogList}
            rightTitle="Plus"
            onRight={() => Actions.timelog({ newEntry: true })}
          />
          <Scene app={this.props.app} key="timelog" component={TimeLogEditor} />
        </Scene>
      </Router>
    )
  }
}

/* <Scene
 *   app={this.props.app}
 *   key="expensesList"
 *   component={ExpensesList}
 *   title="Expenses"
 *   hideNavBar={false}
 * />
 * <Scene
 *   app={this.props.app}
 *   key="expense"
 *   component={ExpenseView}
 *   title="Expense"
 *   hideNavBar={false}
 * />
 * <Scene
 *   app={this.props.app}
 *   key="weekView"
 *   component={WeekView}
 *   title="Week"
 *   hideNavBar={false}
 * />
 * <Scene
 *   app={this.props.app}
 *   key="filter"
 *   component={FilterView}
 *   title="Filter"
 *   hideNavBar={false}
 * />

 * <Scene
 *   app={this.props.app}
 *   key="usersList"
 *   component={UsersList}
 *   title="Users"
 *   hideNavBar={false}
 * />
 * <Scene
 *   app={this.props.app}
 *   key="user"
 *   component={UserPage}
 *   title="User"
 *   hideNavBar={false}
 * />
 * <Scene
 *   app={this.props.app}
 *   key="userAndExpenseList"
 *   component={UsersExpensesList}
 *   hideNavBar={false}
 * />*/
