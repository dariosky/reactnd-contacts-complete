import React, {Component} from 'react';
import PropTypes from 'prop-types'

class ContactList extends Component {
  render() {
    return (<ol className="list-contacts">
    {this.props.contacts.map((contact, index) => (
      <Contact key={contact.id} contact={contact}
      onDeleteContact={this.props.onDeleteContact}/>
    ))
  }
  </ol>)
}
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
}

class Contact extends Component {
  render() {
    const contact = this.props.contact, props=this.props;
    return (
      <li className="contact-list-item">
      <img className="contact-avatar" src={contact.avatarURL} alt=""/>
      <div className="contact-details">
      <p style={{fontWeight: 'bold'}}>{contact.name}</p>
      <p>{contact.email}</p>
      </div>
      <span className="contact-remove"
      onClick={()=>{console.log(props);props.onDeleteContact(contact)}}
      ></span>
      </li>)
    }
  }
  
  export default ContactList
  