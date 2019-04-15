import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import {Query} from 'react-apollo'



import Topbar from './Topbar'

import BookHalf from './BookHalf'
import Search from './Search'
import BookList from './hocs/BookList'


import { getTopBooks } from '../graphql'


export default class TopBooks extends Component {
  componentDidMount() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <Query query={getTopBooks} variables={{page: 1}} notifyOnNetworkStatusChange>
            {({ loading, data, networkStatus, fetchMore }) => {
              var booksData = data.getTopBooks

              if (!booksData) {
                console.error('No Data Returned');
                return null
              }


              var pageSize = 20,
                  page2get = (booksData.length/pageSize)+1

              return (
                <BookList
                  loading={loading}
                  lItems={booksData}
                  onLoadMore={() =>{
                    fetchMore({
                      variables: {
                        page: page2get
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult || fetchMoreResult.getTopBooks.length === 0 || !Number.isInteger(page2get)){
                          return prev
                        }
                        return Object.assign({}, prev, {
                          getTopBooks: [...prev.getTopBooks, ...fetchMoreResult.getTopBooks]
                        });
                      }
                    })
                  }
                  }
                />
              )
            }}
          </Query>


          <span className="subMoreSpan hovEfct" onClick={()=>{this.loadNextPage()}}>
            See More
          </span>
        </section>

      </Fragment>
    )
  }
}
