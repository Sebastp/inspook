import React, { Component } from 'react'
import {Query} from 'react-apollo'

import { searchString } from '../graphql'


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchPhrase: 'asd'
    }
  }


  searchChange = (e) => {
    const phrase = e.target.value
    this.setState({
      searchPhrase: phrase
    });
    console.log(phrase);
  }

  render() {
    const {bottomMsg} = this.props;
    const {searchPhrase} = this.state;

    return (
      <div className="search-center">
        <div className="search-input">
        <label htmlFor="sinputTag" className="search-input__icon"
          style={{ backgroundImage: `url(${require('../assets/img/icons/search.svg')})` }}
        />
        <input placeholder="Search Inspirations..." id="sinputTag" onChange={(e)=>this.searchChange(e)}/>

        <Query query={searchString} variables={{phrase: searchPhrase}}>
          {
            ({loading, error, data}) => {
              if (loading){
                return 'loading'
              }

              if (error) return error.toString()
              console.log(data);

              return null
            }
          }
        </Query>
        </div>
        <span className="subMoreSpan">
          {bottomMsg}
        </span>
      </div>
    )
  }
}
