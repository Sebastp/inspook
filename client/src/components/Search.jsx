import React, { Component } from 'react'




export default class Search extends Component {
  render() {
    const {bottomMsg} = this.props;

    return (
      <div className="search-center">
        <div className="search-input">
          <label htmlFor="sinputTag" className="search-input__icon"
            style={{ backgroundImage: `url(${require('../assets/img/icons/search.svg')})` }}
            />

          <input placeholder="Search Inspirations..." id="sinputTag"/>
        </div>
        <span className="subMoreSpan">
          {bottomMsg}
        </span>
      </div>
    )
  }
}
