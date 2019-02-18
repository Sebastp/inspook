import React, { Component } from 'react'

import { Link } from 'react-router-dom'



export default class Collection extends Component {
  render() {
    return (
      <div className="collection">
        <Link to='/' className="collection-top">
          <div className="collection-top__left"
            style={{
              backgroundImage: `url(${require('../assets/img/booksprofile.svg')})`
            }}/>
          <div className="collection-cover"
            style={{
              backgroundImage: `url(${require('../assets/img/demo/cover1.jpg')})`
            }}
            />
          <div className="collection-top__right"
            style={{
              backgroundImage: `url(${require('../assets/img/booksprofile.svg')})`
            }}/>
        </Link>


        <span className="collection-name">
          <Link to='/'>
            Jeff Bezos
          </Link>
        </span>
        <span className="collection-subtitle">
          <Link to='/'>
            88 Books
          </Link>
        </span>
      </div>
    )
  }
}
