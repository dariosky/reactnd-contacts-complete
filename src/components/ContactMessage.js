import React from 'react'
import PropTypes from 'prop-types'

function ContactMessage(props) {
  return <li className="contact-list-item">
    <span>{props.message}</span>
  </li>
}


ContactMessage.propTypes = {
  message: PropTypes.string.isRequired,
}

export default ContactMessage
