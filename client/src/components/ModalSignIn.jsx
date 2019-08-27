import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ModalSignIn extends Component {
  render() {
    return (
      <div className="row">
        <ul className="col-6 d-flex justify-content-between">
          <li>
            <Link to={'/books'}>
              Top Books
            </Link>
          </li>
          <li>
            <Link to={'/people'}>
              People
            </Link>
          </li>
          <li>
            <Link to={'/collections'}>
              Collections
            </Link>
          </li>
          <li>
            <Link to={'/contribute'}>
              Contribute
            </Link>
          </li>
        </ul>

        <div className="modal-bck"/>
      </div>
    )
  }
}
