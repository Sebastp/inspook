import React, { Component } from 'react'

import { Link } from 'react-router-dom'



export default class Collection extends Component {
  render() {
    const {collObj} = this.props;
    return (
      <div className="collection">
        <Link to='/' className="collection-top">
          <div className="collection-cover"
            style={{
              backgroundImage: `url(${require('../assets/img/demo/cover1.jpg')})`
            }}
          />

          <div className="collection-bck">
            <div className="collection-bck__inner"
              style={{
                backgroundImage: `url(${require('../assets/img/demo/cover1.jpg')})`
              }}
              />
          </div>
        </Link>


        <span className="collection-name">
          <Link to='/'>
            {collObj.name}
          </Link>
        </span>
        <span className="collection-subtitle">
          <Link to='/'>
            {collObj.bookCount} Books
          </Link>
        </span>
      </div>
    )
  }
}
