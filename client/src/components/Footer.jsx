import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Footer extends Component {
  render() {
    return (
      <footer className="row">
        <ul className="col-6 d-flex justify-content-between">
          <li>
            <a target="_blank" href="https://www.facebook.com/socrades.studio">
              Top Books
            </a>
          </li>
          <li>
            <a target="_blank" href='https://www.instagram.com/socrades.studio/'>
              People
            </a>
          </li>
          <li>
            <a target="_blank" href='https://www.behance.net/Socrades'>
              Collections
            </a>
          </li>
          <li>
            <a target="_blank" href='https://medium.com/@socrades'>
              Contribute
            </a>
          </li>
        </ul>

        <div className="col-12">
          <span id="copyr">
            © 2019 Inspook. All rights reserved.
          </span>
        </div>
      </footer>
    )
  }
}
