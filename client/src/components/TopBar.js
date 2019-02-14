import React, { Component, Fragment } from 'react'
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'





export default class TopBar extends Component {
  render() {
    return (
      <div className="app-navbar">
        <div className="container-flexible container-flexible--padding-xl">
          <Link to={'/'}>
            <h1>RoyaleCase</h1>
          </Link>

          <nav>
            <Route
              exact
              path="/cases"
              children={({ match }) => (
                <li className={match ? 'active' : ''}>
                  <Link to={'/'}>
                    Cases
                  </Link>
                </li>
              )}
              />
          </nav>
        </div>
      </div>
    )
  }
}
