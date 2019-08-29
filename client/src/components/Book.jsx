import React, {Component, Fragment} from 'react'

import {Query} from 'react-apollo'
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'

import Sticky from 'react-sticky-el'


import { ModalConsumer } from './ModalContext';


import Topbar from './Topbar'
import ScmButtons from './partials/ScmButtons'
import PageSeeNext from './partials/PageSeeNext'
import BookReview__2 from './BookReview__2'
import Footer from './Footer'


import { getLink } from '../helpers/amazonAff'
import {onShelves} from '../helpers/textTransf'
import {bookReviews} from '../helpers/goodreads'
import {stripHtml} from '../helpers/stripHtml'

import { nrOfShelves, getBookReviews } from '../graphql'
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

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

  handleImageLoaded = (i) => {
    if (parseFloat(i.height) > 10) {
      console.dir(i.height);
    }
  }

  render() {
    const {bookObj} = this.state
    const {bookId} = this


    if (bookObj) {
      var book_rating = parseFloat(bookObj.average_rating[0]).toFixed(1),
          book_title = bookObj.title[0],
          book_author = bookObj.authors[0].author[0].name[0],
          book_desc = bookObj.description[0],
          book_cover = bookObj.cover,
          book_url = bookObj.url[0]
    }else {
      var book_cover = '',
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

            <div className="bookPage-canvas bcp-canvas">
              <div className="bookPage-cover bcp-canvas__cover"
                style={{ backgroundImage: `url(${book_cover})` }}
              />
            </div>


            <div className="row">
              <div className="col-0 col-lg-1"/>
              <div className="bookPage-info bcp-info col-12 col-md-6 col-lg-5">
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
                  <p>Stars on GoodReads  {book_rating}</p>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-5 colBigPading-left bookPage-desc">
                <ResponsiveEllipsis
                  text={stripHtml(book_desc)}
                  maxLine='3'
                  ellipsis='...'
                  trimRight
                  basedOn='letters'
                  className="pagebcpMain-leftDesc"
                  component="p"
                />

                <span className="subAnach pagebcpMain-leftSub">
                  <a target="_blank" href={book_url}>
                    Goodreads Description
                  </a>
                </span>
              </div>

              <div className="col-0 col-lg-1"/>
            </div>
          </header>



          <div className="midRow">
            <div className="midRow__item">
              <span className="itmDesc">Buy this book on</span>
              <div className="itmRight">
                <a className="button-filled button-filledBlack" target="_blank" href={getLink(this.bookId)}>
                  Amazon
                </a>
                <a className="button-filled button-filledBlack" target="_blank" href={getLink(this.bookId)}>
                  Book Depository
                </a>
              </div>
            </div>
          </div>

          <section className="pagebcpMain cont-width_0">
            <div className="row rowCont">
              <div className="col-0 col-lg-1"/>
              <Query query={getBookReviews} variables={{bookid: this.bookId}}>
                {
                  ({loading, error, data}) => {
                    if (loading){
                      return (
                        <div className="col col-md-8 col-lg-6 centColumn bookPage-noRevs">
                          <ScmButtons shareUrl={window.location.href}/>
                        </div>
                      )
                    }

                    if (error) {
                      return error.toString()
                    }

                    var bookData = data.getBookReviews

                    bookData = bookData.filter(rev => rev.review);

                    if (bookData.length) {
                      return (
                        <Fragment>
                          <Sticky className="shareBtns" topOffset={-100} boundaryElement=".pagebcpMain">
                            <ScmButtons shareUrl={window.location.href}/>
                          </Sticky>

                          <div className="col col-md-8 col-lg-6 centColumn">
                            <ul className="bookPage-revUl">
                              {bookData.map((rev,i)=>(
                                <li key={i}>
                                  <BookReview__2 revOjb={rev}/>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Fragment>
                      )
                    }else {
                      return (
                        <div className="col col-md-8 col-lg-6 centColumn bookPage-noRevs">
                          <ScmButtons shareUrl={window.location.href}/>
                        </div>
                      )
                    }
                  }
                }
              </Query>

              <div className="col-0 col-lg-1"/>
            </div>
          </section>
        </div>

        <PageSeeNext/>
        <Footer/>
      </Fragment>
    )
  }
}
