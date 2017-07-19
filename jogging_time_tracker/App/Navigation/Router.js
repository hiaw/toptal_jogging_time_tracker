/* @flow*/
import React, { Component } from 'react'
import { Actions, ActionConst, Scene, Router } from 'react-native-router-flux'

// Containers
import LoginContainer from '../Containers/LoginContainer.js'
import TimeLogEditor from '../Containers/TimeLogEditor.js'
import TimeLogList from '../Containers/TimeLogList.js'

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
          key="timelogs"
          title="Time Logs"
          component={TimeLogList}
          leftTitle="Logout"
          onLeft={() => Actions.login({ type: ActionConst.RESET })}
          rightTitle="Add"
          onRight={() => Actions.timelog({ newEntry: true })}
        />
        <Scene
          app={this.props.app}
          key="timelog"
          title="Time Log"
          component={TimeLogEditor}
        />
      </Router>
    )
  }
}
