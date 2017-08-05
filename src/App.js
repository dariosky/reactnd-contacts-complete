import React, {Component} from 'react';
import ContactList from './ContactList';

class App extends Component {

  deleteContact = (contact) => {
    console.log("Deleting", contact.id);
    this.setState((state) => ({
      //contacts:state.contacts.filter((c)=>c.id!==contact.id)
    }))
  }


  render() {
    return (
      <ContactList
        onDeleteContact={this.deleteContact}
        contacts={[]}
      />
    )
  }
}

export default App;
