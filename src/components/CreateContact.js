import React from 'react'
import ImageInput from './ImageInput'
import Link from 'react-router-dom/es/Link'
import {Component} from 'react/lib/ReactBaseClasses'
import serializeForm from 'form-serialize'
import {PropTypes} from 'prop-types'

// import PropTypes from 'prop-types'

class CreateContact extends Component {
  static propTypes = {
    onCreateContact: PropTypes.func.isRequired,
  }

  onSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})
    this.props.onCreateContact(values)
  }

  render() {
    return (
      <div>
        <Link className="close-create-contact" to="/">Close</Link>
        <form className="create-contact-form" onSubmit={this.onSubmit}>
          <ImageInput
            className="create-contact-avatar-input"
            name="avatarURL"
            maxHeight={64}
          />
          <div className="create-contact-details">
            <input type="text" name="name" placeholder="Name"/>
            <input type="text" name="email" placeholder="Email"/>
            <button>Add Contact</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateContact
