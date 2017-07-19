import React, { Component } from 'react'
import { compose, withState } from 'recompose'
import { View, FlatList, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { ListItem } from 'react-native-elements'

const styles = {
  container: {
    flex: 1,
    marginTop: 65,
  },
}

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
    this.userService.find().then(users => {
      this.props.setList(users.data)
    })
  }

  _renderUser(user) {
    return (
      <ListItem
        title={user.email}
        onPress={() => {
          Actions.user({ user })
        }}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.lists}
          renderItem={user => this._renderUser(user.item)}
        />

        <View style={{ backgroundColor: 'lightblue' }}>
          <Button
            onPress={() => {
              Actions.user()
            }}
            title="Add User"
          />
        </View>
      </View>
    )
  }
}

export default compose(withState('lists', 'setList', []))(UsersList)
