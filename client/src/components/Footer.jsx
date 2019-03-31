import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Footer extends Component {
  render() {
    return (
      <footer className="cont-width_0">
        <div className="row">
          <div className="col-12">
            <ul>
              <li className="navAnach">
                <Link to={'/top-books'}>
                  Top Books
                </Link>
              </li>
              <li className="navAnach">
                <Link to={'/people'}>
                  People
                </Link>
              </li>
              <li className="navAnach">
                <Link to={'/collections'}>
                  Collections
                </Link>
              </li>
              <li className="navAnach">
                <Link to={'/contribute'}>
                  Contribute
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-12">
            <span id="copyr">
              © 2019 Inspook. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    )
  }
}
