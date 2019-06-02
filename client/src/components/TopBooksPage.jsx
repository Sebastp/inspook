import React, { Component, Fragment } from 'react'
import {Query} from 'react-apollo'

import Sticky from 'react-sticky-el';


import Topbar from './Topbar'
import Footer from './Footer'

import Search from './Search'
import BookList from './hocs/BookList'


import { getTopBooks } from '../graphql'


export default class TopBooksPage extends Component {
  componentDidMount() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  render() {
    return (
      <Fragment>
        <Topbar/>
        <div className="cont-width_0">
          <header className="pageHeader">
            <div className="pageHeader__tagline centered">
              <h1>Most Recommended Books</h1>
              <p>Our most Recommended set of books</p>
            </div>

            {/*
              <nav className="pageHeader__nav">
              <div className="navAnach active">
              Entrepreneurs
              </div>
              <div className="navAnach">
              Artists
              </div>
              <div className="navAnach">
              Politicians
              </div>
              <div className="navAnach">
              Scientists
              </div>
              </nav>
              */}
            <div className="pageHeader__midrow">
              <div className="bck"/>
            </div>
          </header>



          <section className="pageMain centColumn">
            <Query query={getTopBooks} variables={{page: 1}} notifyOnNetworkStatusChange>
              {({ loading, data, error, networkStatus, fetchMore }) => {
                if (!data && !loading) {
                  console.error('No Data Returned');
                  return null
                }

                if (error) {
                  console.log(error.toString());
                  return null
                }

                if (loading) {
                  var booksData = []
                }else {
                  var booksData = data.getTopBooks
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
          </section>
        </div>
        <Footer/>
      </Fragment>
    )
  }
}
