import React, {Component} from 'react'
import ContactList from './components/ContactList'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './components/CreateContact'

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      contacts: null,
      screen: 'list',
    }
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
        this.setState({
            contacts,
          },
        )
      },
    )
  }

  deleteContact = (contact) => {
    console.log("Deleting", contact.id)
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id),
    }))
    ContactsAPI.remove(contact)
  }

  goTo = (screen) => this.setState({
    screen,
  })


  render() {
    const state = this.state
    return (
      <div className="app">
        {state.screen === 'list' && (
          <ContactList
            goTo={this.goTo}
            onDeleteContact={this.deleteContact}
            contacts={this.state.contacts}
          />
        )}
        {state.screen === 'create' && (
          <CreateContact/>
        )}
      </div>
    )
  }
}

export default App
