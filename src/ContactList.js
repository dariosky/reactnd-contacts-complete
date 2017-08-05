import React, {Component} from 'react';
import PropTypes from 'prop-types'
import escapeStringRegexp from 'escape-string-regexp'
import sortBy from 'sort-by'
import {getAll} from './utils/ContactsAPI';

class ContactList extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      query: '',
      contacts: null
    };

  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    })
  };

  static propTypes = {
    onDeleteContact: PropTypes.func.isRequired,
  };

  componentDidMount() {
    getAll().then((contacts) => {
        this.setState({
            contacts: contacts
          }
        )
      }
    )
  }


  render() {
    console.log(this.state);
    const {contacts, query} = this.state;
    const {onDeleteContact} = this.props,
      match = new RegExp(escapeStringRegexp(query), 'i');

    if (contacts === null) {
      return <div>Loading contacts...</div>
    }

    const filteredContact = query ? contacts.filter(
      (e) => match.test(e.name)
    ) : contacts;

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input className="search-contacts"
                 type="text"
                 placeholder="Search contacts"
                 value={this.state.query}
                 onChange={(e) => {
                   this.updateQuery(e.target.value)
                 }}
          />
        </div>

        {filteredContact.length !== contacts.length && (
          <div className="showing-contacts">
            Showing {filteredContact.length} out of {contacts.length}
          </div>
        )}

        <ol className="list-contacts">
          {filteredContact.sort(sortBy('name', 'email')).map((contact, index) => (
            <Contact key={contact.id} contact={contact}
                     onDeleteContact={onDeleteContact}/>
          ))
          }
        </ol>
      </div>
    )
  }
}

class Contact extends Component {
  render() {
    const {contact} = this.props;
    const {onDeleteContact} = this.props;

    return <li className="contact-list-item">
      <img className="contact-avatar" src={contact.avatarURL} alt=""/>
      <div className="contact-details">
        <p style={{fontWeight: 'bold'}}>{contact.name}</p>
        <p>{contact.email}</p>
      </div>
      <span className="contact-remove"
            onClick={() => {
              onDeleteContact(contact)
            }}
      />
    </li>
  }
}

export default ContactList
