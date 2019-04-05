import React, { Component } from 'react'
import { Link } from 'react-router-dom'




export default class Search extends Component {
  render() {
    const {bottomMsg} = this.props;

    return (
      <div className="search-center">
        <div className="search-input">
          <input placeholder="Search Inspirations..."/>
        </div>
        <span className="subMoreSpan">
          {bottomMsg}
        </span>
      </div>
    )
  }
}
