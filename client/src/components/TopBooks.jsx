import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import {Query} from 'react-apollo'



import Topbar from './Topbar'
import Footer from './Footer'
import BookHalf from './BookHalf'


import { getTopBooks } from '../graphql'


export default class TopBooks extends Component {
  state = {
    bookObj: false
  }



  render() {
    return (
      <Fragment>
        <header id="header">
          <Topbar/>

          <section id="header-inner">
            <div id="tagline">
              <h1>Most Recommended Books</h1>
              <p>See the most Recommended Books by Successful People</p>
            </div>
          </section>
        </header>


        <div className="reader-books">
          <ul className="row">
            <Query query={getTopBooks} variables={{page: 1}}>
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
                    booksData.map((item, i) => (<BookHalf key={i} bookinfo={item}/>))
                  )
                }
              }
            </Query>
          </ul>
        </div>

        <Footer />
      </Fragment>
    )
  }
}
