import React, {Component} from 'react'
import ContactList from './components/ContactList'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {contacts: null}
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


  render() {
    return (
      <ContactList
        onDeleteContact={this.deleteContact}
        contacts={this.state.contacts}
      />
    )
  }
}

export default App
