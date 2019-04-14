import React, {Component, Fragment} from 'react'
import {Query} from 'react-apollo'
import {Link} from 'react-router-dom'

import Dotdotdot from 'react-clamp'

import stripHtml from "string-strip-html";


import Topbar from './Topbar'
import BookReview from './BookReview'


import {bookReviews} from '../helpers/goodreads'

import { nrOfShelves, getBookReviews } from '../graphql'

export default class Book extends Component {
  state = {
    bookObj: false
  }

  BookIdProp = this.props.match.params.urlBookId
  urlArr = this.BookIdProp.split('_')
  bookId = this.urlArr[this.urlArr.length-1]

  componentDidMount(){
    bookReviews(this.bookId).then(res=>{
      this.setState({
        bookObj: res
      });
    });
  }


  render() {
    const {bookObj} = this.state


    if (bookObj) {
      var book_rating = parseFloat(bookObj.average_rating[0]).toFixed(1),
          book_title = bookObj.title[0],
          book_author = bookObj.authors[0].author[0].name[0],
          book_desc = bookObj.description[0],
          book_cover = bookObj.cover
    }else {
      var book_cover = require('../assets/img/noBookCover.jpg'),
          book_title = 'Loading Title',
          book_author = 'Loading Author',
          book_desc = '',
          book_rating = 5.0
    }



    return (
      <Fragment>
        <Topbar/>

        <div className="bookPage">
          <header className="cont-width_2">
            <div className="bookPage-top">
              <div className="bookPage-cover"
                style={{ backgroundImage: `url(${book_cover})` }}
              />
              <div className="bookPage-bck"/>
            </div>


            <h1 className="bookPage-title">{book_title}</h1>
            <span className="bookPage-author">{book_author}</span>
            <p className="bookPage-desc">
              <Dotdotdot clamp={3}>
                {stripHtml(book_desc)}
              </Dotdotdot>
            </p>
          </header>




          <div className="midRow cont-width_2">
            <div className="midRow__item">
              <span className="itmDesc">Rating on Goodreads</span>
              <span className="itmNum">{book_rating}</span>
            </div>

            <div className="midRow-break"/>

            <div className="midRow__item">
              <span className="itmDesc">On Shelves</span>
              <span className="itmNum">
                <Query query={nrOfShelves} variables={{bookid: this.bookId}}>
                  {
                    ({loading, error, data}) => {
                      if (loading){
                        return null
                      }

                      if (error) {
                        console.log(error.toString());
                        return null
                      }

                      var shelves = data.nrOfShelves

                      return shelves
                    }
                  }
                </Query>
              </span>
            </div>

            <div className="midRow-break"/>

            <div className="midRow__item">
              <span className="itmDesc">Share</span>
              <div className="itmScm">
                <img src={ require('../assets/img/icons/fb.png') }/>
                <img src={ require('../assets/img/icons/twt.png') }/>
                <img src={ require('../assets/img/icons/in.png') }/>
              </div>
            </div>
          </div>





          <section className="pageMain">
            <h3 className="sect-header_s1">Reviews</h3>

            <ul className="cont-width_2">
              <Query query={getBookReviews} variables={{bookid: this.bookId}}>
                {
                  ({loading, error, data}) => {
                    if (loading){
                      return 'loading'
                    }

                    if (error) {
                      return error.toString()
                    }

                    var bookData = data.getBookReviews



                    return (
                      bookData.map((rev,i)=>(
                        <li>
                          <BookReview revOjb={rev}/>
                        </li>
                      ))
                    )
                  }
                }
              </Query>
            </ul>
          </section>
        </div>
      </Fragment>
    )
  }
}
