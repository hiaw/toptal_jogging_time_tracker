/* @flow*/
import React, { Component } from 'react'
import { compose, withState } from 'recompose'
import { View, FlatList, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { ListItem } from 'react-native-elements'

const styles = {
  container: {
    marginTop: 65,
  },
}

const keyExtractor = item => item._id

class UsersList extends Component {
  constructor(props) {
    super(props)

    this.userService = props.app.service('users')

    this.updateList()

    this.userService.on('created', user => {
      this.updateList()
    })
    this.userService.on('removed', user => {
      this.updateList()
    })
    this.userService.on('updated', user => {
      this.updateList()
    })
    this.userService.on('patched', user => {
      this.updateList()
    })
  }

  updateList() {
    let query = { query: { $sort: { email: 1 } } }
    this.userService.find(query).then(users => {
      this.props.setList(users.data)
    })
  }

  _renderUser(user) {
    return (
      <ListItem
        title={user.email}
        onPress={() => {
          Actions.user({ user, role: this.props.role })
        }}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={keyExtractor}
          data={this.props.lists}
          renderItem={user => this._renderUser(user.item)}
        />

        <View style={{ backgroundColor: 'lightblue' }}>
          <Button
            onPress={() => {
              Actions.user({ newEntry: true })
            }}
            title="Add User"
          />
        </View>
      </View>
    )
  }
}

export default compose(withState('lists', 'setList', []))(UsersList)
