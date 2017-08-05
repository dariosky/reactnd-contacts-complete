import React, {Component} from 'react'
import PropTypes from 'prop-types'

const ContactMessage = (props) =>
  <li className="contact-list-item">
    <span>{props.message}</span>
  </li>


ContactMessage.propTypes = {
  message: PropTypes.string.isRequired,
}

export default ContactMessage
