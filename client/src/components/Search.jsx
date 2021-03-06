import React, { Component } from 'react'
import {Query} from 'react-apollo'
import { Link } from 'react-router-dom'

import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'

import { searchString } from '../graphql'

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchPhrase: ''
    }
  }


  searchChange = (e) => {
    const phrase = e.target.value
    if (this.props.getSearchChange) {
      this.props.getSearchChange(phrase)
    }else {
      this.setState({
        searchPhrase: phrase
      });
    }
  }

  render() {
    var {bottomMsg, maxResults, type, expendedHeight} = this.props;
    const {searchPhrase} = this.state;

    var bottomMsg = bottomMsg?bottomMsg:'Search...'

    if (type) {
      var contType = 'search-center__'+type
    }else {
      var contType = ''
    }

    if (expendedHeight && searchPhrase!='') {
      var addStyle = {height: expendedHeight+'px'}
    }else {
      var addStyle = {height: '48px'}
    }

    return (
      <div className={"search-center "+contType}
          style={addStyle}
      >
        <div className="search-input">
          <label className="search-input__icon"
            style={{ backgroundImage: `url(${require('../assets/img/icons/search.svg')})` }}
          />
          <input placeholder={bottomMsg} autoComplete="off" spellCheck="false" onChange={(e)=>this.searchChange(e)}/>
        </div>

        <Query query={searchString} variables={{phrase: searchPhrase}}>
          {
            ({loading, error, data}) => {
              if (searchPhrase=='') { return null }

              if (loading){
                return (
                  <ul className="search-result loading">
                    <li className="result-itm">
                      <div className="result-itm__left">
                        <div className="itm-name gradient-loadAnim"/>
                        <div className="itm-subtitle gradient-loadAnim"/>
                      </div>
                    </li>
                  </ul>
                )
              }

              if (error) return error.toString()

              var searchRes = data.searchString

              if (maxResults) {
                searchRes = searchRes.slice(0, maxResults)
              }
              if (!searchRes.length) { return null }

              return(
                <ul className="search-result">
                  {searchRes.map((resultItm,i)=>(
                    <li className="result-itm" key={i}>
                      <div className="result-itm__left">
                        <h5 className="itm-name">
                          <Link to={'/reader/'+resultItm.uid}>
                            <ResponsiveEllipsis
                              text={resultItm.name}
                              maxLine='1'
                              ellipsis='...'
                              trimRight
                              basedOn='letters'
                            />
                          </Link>
                        </h5>

                        <span className="itm-subtitle">
                          <Link to={'/reader/'+resultItm.uid}>
                            {resultItm.booksCount} Books
                          </Link>
                        </span>
                      </div>

                      <span className="result-itm__right">{resultItm.type}</span>
                    </li>
                  ))}
                </ul>
              )

              return null
            }
          }
        </Query>
      </div>
    )
  }
}
