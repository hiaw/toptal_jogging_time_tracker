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
          rightTitle="Add"
          onRight={() => Actions.timelog({ newEntry: true })}
          hideNavBar={false}
        />
        <Scene
          app={this.props.app}
          key="timelog"
          title="Time Log"
          component={TimeLogEditor}
          hideNavBar={false}
        />
      </Router>
    )
  }
}
