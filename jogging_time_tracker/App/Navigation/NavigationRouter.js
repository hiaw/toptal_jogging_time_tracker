/* @flow*/
import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'

// Containers
import LoginContainer from '../Containers/LoginContainer.js'
import UserContainer from '../Containers/UserContainer.js'
import TimeLogEditor from '../Containers/TimeLogEditor.js'
import TimeLogsContainer from '../Containers/TimeLogsContainer.js'

import UsersList from '../Components/User/UsersList.js'
import StatisticsView from '../Components/TimeLog/StatisticsView.js'

export default class NavigationRouter extends Component {
  render() {
    return (
      <Router>
        <Scene
          app={this.props.app}
          key="login"
          component={LoginContainer}
          hideNavBar
        />
        <Scene
          app={this.props.app}
          key="user"
          component={UserContainer}
          hideNavBar={false}
        />
        <Scene
          app={this.props.app}
          key="timelogs"
          title="Time Logs"
          component={TimeLogsContainer}
          hideNavBar={false}
        />
        <Scene
          app={this.props.app}
          key="timelog"
          title="Time Log"
          component={TimeLogEditor}
          hideNavBar={false}
        />
        <Scene
          app={this.props.app}
          key="usersList"
          component={UsersList}
          title="Users"
          hideNavBar={false}
        />
        <Scene
          app={this.props.app}
          key="statistics"
          component={StatisticsView}
          title="Statistics"
          hideNavBar={false}
        />
      </Router>
    )
  }
}
