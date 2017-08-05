import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeStringRegexp from 'escape-string-regexp'
import sortBy from 'sort-by'
import ContactMessage from './ContactMessage'

class ContactList extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      query: '',
    }

  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim(),
    })
  }

  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  }

  render() {
    console.log(this.state)
    const {query} = this.state
    const {contacts, onDeleteContact} = this.props,
      match = new RegExp(escapeStringRegexp(query), 'i')

    const filteredContact = (query && contacts !== null) ? contacts.filter(
      (e) => match.test(e.name),
    ) : contacts


    let body = []
    if (contacts === null)
      body.push(<ContactMessage message="Loading contacts..."/>)
    else if (contacts.length === 0) body.push(
      <ContactMessage message="No contacts"/>,
    )
    else {
      if (filteredContact.length !== contacts.length)
        body.push(<div className="showing-contacts">
            {`Showing ${filteredContact.length} out of ${contacts.length}`}
          </div>,
        )
      body.push(<ol className="list-contacts">
        {filteredContact.sort(sortBy('name', 'email')).map((contact, index) => (
          <Contact key={contact.id} contact={contact}
                   onDeleteContact={onDeleteContact}/>
        ))
        }
      </ol>)
    }

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
        {body}
      </div>
    )
  }
}

class Contact extends Component {
  render() {
    const {contact} = this.props
    const {onDeleteContact} = this.props

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
