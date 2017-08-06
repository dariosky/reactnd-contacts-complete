import React, {Component} from 'react'
import ContactList from './components/ContactList'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './components/CreateContact'
import {Route} from 'react-router-dom'

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      contacts: null,
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

  createContact(contact) {
    console.log('creating', contact)
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([contact]),
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/"
               render={() => <ContactList
                 onDeleteContact={this.deleteContact}
                 contacts={this.state.contacts}
               />}
        />
        <Route path="/create" render={({history}) => <CreateContact
          onCreateContact={(contact) => {
            this.createContact(contact)
            history.push('/')
          }
          }
        />
        }/>
      </div>
    )
  }
}

export default App
