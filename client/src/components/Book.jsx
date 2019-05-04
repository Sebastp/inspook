import React, {Component, Fragment} from 'react'

import {Query} from 'react-apollo'
import Dotdotdot from 'react-clamp'
import stripHtml from "string-strip-html";

import { ModalConsumer } from './ModalContext';


import Topbar from './Topbar'
import ScmButtons from './partials/ScmButtons'
import PageSeeNext from './partials/PageSeeNext'
import BookReview__2 from './BookReview__2'
import Footer from './Footer'


import { getLink } from '../helpers/amazonAff'
import {onShelves} from '../helpers/textTransf'
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
    const {bookId} = this

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
          <header className="cont-width_0 pagebcpTop">
            <div className="row">
              <div className="col-0 col-lg-1"/>

              <div className="bookPage-info bcp-info col-7 col-lg-6">
                <div className="bcp-infoCenter">
                  <span className="subAnach bcp-pname">Book</span>
                  <h1 className="bookPage-title bcp-title">{book_title}</h1>
                  <span className="bookPage-author bcp-desc">{book_author}</span>
                </div>

                <div className="bookPage-specs bcp-spec">
                  <Query query={nrOfShelves} variables={{bookid: bookId}}>
                    {
                      ({loading, error, data}) => {
                        if (loading){
                          return <p/>
                        }

                        if (error) {
                          console.log(error.toString());
                          return null
                        }

                        var shelves = data.nrOfShelves

                        return (
                          <ModalConsumer>
                            {({ showModal, props }) => (
                              <p onClick={() => {if(shelves>0) showModal( 'mShelves', { shelves, bookId })}} >
                                {onShelves(shelves)}
                              </p>
                            )}
                          </ModalConsumer>
                        )
                      }
                    }
                  </Query>
                  <p>Stars on GoodReads {book_rating}</p>
                </div>
              </div>


              <div className="bookPage-canvas bcp-canvas col-5 col-lg-4">
                <div className="bookPage-cover bcp-canvas__cover"
                  style={{ backgroundImage: `url(${book_cover})` }}
                  />
                <div className="bookPage-bck bcp-canvas__bck"
                    style={{
                      backgroundColor: '#bde9fb'
                    }}
                />
              </div>

              <div className="col-0 col-lg-1"/>
            </div>
          </header>



          <div className="midRow cont-width_0">
            <div className="midRow__item">
              <span className="itmDesc">Buy on</span>
              <div className="itmRight">
                <a className="button-filled" target="_blank" href={getLink(this.bookId)}>
                  Amazon
                </a>
                <a className="button-filled" target="_blank" href={getLink(this.bookId)}>
                  Book Depository
                </a>
              </div>
            </div>

            <div className="midRow__item">
              <span className="itmDesc">Share</span>
              <div className="itmScm">
                <ScmButtons shareUrl={window.location.href}/>
              </div>
            </div>
          </div>

          <section className="pagebcpMain cont-width_0">
            <div className="row">
              <div className="col-6 colBigPading-right">

                <Dotdotdot clamp={3} className="pagebcpMain-leftDesc" tagName="p">
                  {stripHtml(book_desc)}
                </Dotdotdot>
                <span className="subAnach pagebcpMain-leftSub">Goodreads Description</span>
              </div>

              <ul className="col-6 bookPage-revUl">
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

                      bookData = bookData.filter(rev => rev.review);

                      return (
                        bookData.map((rev,i)=>(
                          <li key={i}>
                            <BookReview__2 revOjb={rev}/>
                          </li>
                        ))
                      )
                    }
                  }
                </Query>
              </ul>
            </div>
          </section>
        </div>

        <PageSeeNext/>
        <Footer/>
      </Fragment>
    )
  }
}
