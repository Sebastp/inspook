import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import {Query} from 'react-apollo'



import Topbar from './Topbar'

import BookHalf from './BookHalf'
import Search from './Search'
import ChapterListQuery from './hocs/ChapterListQuery'


import { getTopBooks } from '../graphql'


export default class TopBooks extends Component {
  state = {
    loadPage: 1
  }

  loadNextPage(){
    this.setState({ loadPage: this.state.loadPage+1 });
  }


  render() {
    return (
      <Fragment>
        <Topbar/>
        <header className="pageTop cont-width_2">
          <div className="pageTop__tagline">
            <h1>Most Recommended Books</h1>
            <p>Search our Database to find your Inspiration</p>
          </div>

          <Search bottomMsg="Type a Book Title"/>
        </header>

        <section className="pageMain">
          <ul className="cont-width_2">
            <ChapterListQuery/>
            {/*
            <Query query={getTopBooks} variables={{page: this.state.loadPage}}>
              {
                ({loading, error, data}) => {
                  if (loading){
                    return 'loading'
                  }
                  if (error) {
                    return error.toString()
                  }

                  var booksData = data.getTopBooks
                  console.log(booksData);


                  return (
                    booksData.map((item, i) => (
                      <li className="pageMain__bookLi" key={i}>
                        <BookHalf onShelvesProp={item.onShelves} bookId={item.bookId}/>
                      </li>
                    ))
                  )
                }
              }
            </Query>
            */}
          </ul>

          <span className="subMoreSpan hovEfct" onClick={()=>{this.loadNextPage()}}>
            See More
          </span>
        </section>

      </Fragment>
    )
  }
}
