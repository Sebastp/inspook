import React, { Component } from 'react'

import { Link } from 'react-router-dom'



export default class PersonMini extends Component {
  render() {
    return (
      <div className="person">
        <Link to='/reader/' className="person-cover">
          <div className="person-cover__inner"
            style={{
              backgroundImage: `url(${require('../assets/img/demo/avatar.png')})`
            }}
            />
        </Link>


        <span className="person-name">
          <Link to='/reader/'>
            Jeff Bezos
          </Link>
        </span>
        <span className="person-subtitle">88 Books</span>
      </div>
    )
  }
}
