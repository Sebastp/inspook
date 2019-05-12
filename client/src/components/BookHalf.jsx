import React, { Component } from 'react'

import {Query} from 'react-apollo'
import { Link } from 'react-router-dom'
import Dotdotdot from 'react-clamp'

import { ModalConsumer } from './ModalContext';

import BookHalf_loading from './BookHalf_loading';
import BookReview__2 from './BookReview__2';


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
    const {bookId, onShelvesProp, viewReviews, reviewsList} = this.props
    const {bookObj} = this.state


    if (bookObj) {
      var bookUrl = friendlyBookUrl(bookObj.title[0], bookId),
          book_rating = parseFloat(bookObj.average_rating[0]).toFixed(1),
          book_title = bookObj.title[0],
          book_author = bookObj.authors[0].author[0].name[0],
          book_cover = bookObj.cover
    }else {
      return (<BookHalf_loading/>)
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
                  {book_title}
                </Dotdotdot>
              </Link>
            </h5>
            <span className="book-author">
              <Dotdotdot clamp={1}>
                {book_author}
              </Dotdotdot>
            </span>
            <div className="book-midrow">
              <div className="book-rate"><span>{book_rating}</span>Stars on GoodReads</div>

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
                      <ModalConsumer>
                        {({ showModal, props }) => (
                          <span className="book-spec info_brand_v1"
                            onClick={() => {if(shelves>0) showModal( 'mShelves', { shelves, bookId })}} >
                            {onShelves(shelves)}
                          </span>
                        )}
                      </ModalConsumer>
                    )
                  }
                }
              </Query>
            </div>

            <div className="book-bottom">
              <a className="button-filled book-buy" target="_blank" href={getLink(bookId)}>
                Buy on Amazon
              </a>
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
                    <BookReview__2 key={i} revOjb={rev}/>
                  ))
                )

              }
            }
          </Query>
        ):(
          reviewsList && (
            reviewsList.map((rev,i)=>(
              <BookReview__2 key={i} revOjb={rev}/>
            ))
          )
        )}
      </div>
    )
  }
}
