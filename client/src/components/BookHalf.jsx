import React, { Component } from 'react'

import {Query} from 'react-apollo'
import { Link } from 'react-router-dom'

import Dotdotdot from 'react-clamp'

import {bookReviews} from '../helpers/goodreads'
import {onShelves, friendlyBookUrl} from '../helpers/textTransf'
import { getLink } from '../helpers/amazonAff'

import { nrOfShelves, getBookReviews } from '../graphql'


export default class BookHalf extends Component {
  state = {
    bookObj: false
  };

  componentDidMount(){
    bookReviews(this.props.bookId).then(res=>{
      this.setState({
        bookObj: res
      });
    });
  }

  render() {
    const {bookId, onShelvesProp, viewReviews} = this.props
    const {bookObj} = this.state


    if (bookObj) {
      var bookUrl = friendlyBookUrl(bookObj.title[0], bookId),
          book_rating = parseFloat(bookObj.average_rating[0]).toFixed(1),
          book_title = bookObj.title[0],
          book_author = bookObj.authors[0].author[0].name[0],
          book_cover = bookObj.cover
    }else {
      var bookUrl = bookId,
          book_cover = require('../assets/img/noBookCover.jpg')
    }



    return (
      <div className="bookHalf">
        <div className="book-top">
          <Link to={'/book/'+bookUrl} className="book-canvas">
            <div className="book-cover">
              <div className="book-cover__inner"
                style={{ backgroundImage: `url(${book_cover})` }}
              />
            </div>
          </Link>



          <div className="book-content">
            <h5 className="book-title">
              <Link to={'/book/'+bookUrl}>
                <Dotdotdot clamp={2}>
                  {bookObj?book_title:'Loading Title...'}
                </Dotdotdot>
              </Link>
            </h5>
            <span className="book-author">
              <Dotdotdot clamp={1}>
                {bookObj?book_author:'Loading Author...'}
              </Dotdotdot>
            </span>
            <div className="book-midrow">
              <div className="book-rate"><span>{bookObj?book_rating:'0.0'}</span>Rating On GoodReads</div>
            </div>

            <div className="book-bottom">
              <div className="book-buy">
                <span>Buy on</span>
                <a target="_blank" href={getLink(bookId)}>
                  Amazon
                </a>
              </div>


              <Query query={nrOfShelves} skip={typeof onShelvesProp != "undefined"} variables={{bookid: bookId, numToGet: 1}}>
                {
                  ({loading, error, data}) => {
                    if (error) {
                      console.log(error.toString());
                      return null;
                    }
                    if (loading) {
                      return <span className="book-spec info_brand_v1"/>;
                    }
                    
                    if (typeof onShelvesProp != "undefined" && !data) {
                      var shelves = onShelvesProp
                    }else {
                      var shelves = data.nrOfShelves
                    }

                    return (
                      <span className="book-spec info_brand_v1">{onShelves(shelves)}</span>
                    )
                  }
                }
              </Query>
            </div>
          </div>
        </div>


        {viewReviews?(
          <Query query={getBookReviews} variables={{bookid: bookId, readerIds: ['elon-musk']}}>
            {
              ({loading, error, data}) => {
                if (error) {
                  console.log(error.toString());
                  return null
                }

                if (loading) {
                  return null
                }

                const reviews = data.getBookReviews;
                return (
                  reviews.map((rev,i)=>(
                    <div className="book-review" key={i}>
                      <span className="book-review__name info_brand_v1">
                        <Link to={'/reader/'+rev.uid}>
                          {rev.displayName}
                        </Link>
                      </span>

                      <Link to={'/reader/'+rev.uid} className="book-review__inner">
                        <Dotdotdot tagName="p" clamp={4}>
                          {rev.review}
                        </Dotdotdot>
                      </Link>
                    </div>
                  ))
                )

              }
            }
          </Query>
        ):''}

      </div>
    )
  }
}
