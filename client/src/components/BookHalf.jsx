import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import {bookReviews} from '../helpers/goodreads'

import {onShelves} from '../helpers/textTransf'


export default class BookHalf extends Component {
  state = {
    bookObj: false
  };

  componentDidMount(){
    bookReviews(this.props.bookinfo.bookId).then(res=>{
      this.setState({
        bookObj: res
      });
    });
  }

  render() {
    const {bookinfo} = this.props
    const {bookObj} = this.state
    if (bookObj) {
      var bookUrl = bookObj.title[0].replace(/ /g,"-") + '_' + bookinfo.bookId;
    }else {
      var bookUrl = bookinfo.bookId;
    }


    return (
      <div className="bookHalf">
        <div className="book-top">
          <Link to={'/book/'+bookUrl} className="book-canvas">
            <div className="book-cover">
              <div className="book-cover__inner"
                style={{
                  backgroundImage: bookObj?`url(${bookObj.image_url[0]})`:`url(${require('../assets/img/demo/cover1.jpg')})`
                }}
                />
            </div>
          </Link>



          <div className="book-content">
            <h5 className="book-title">{bookObj?bookObj.title[0]:'Loading Title...'}</h5>
            <span className="book-author">{bookObj?bookObj.authors[0].author[0].name[0]:'Loading Author...'}</span>
            <div className="book-midrow">
              <div className="book-rate"><span>{bookObj?bookObj.average_rating[0]:'0.0'}</span>on goodreads</div>
            </div>

            <div className="book-bottom">
              <div className="book-buy">
                <span>Buy on</span>
                <a target="_blank" href='https://www.amazon.com'>
                  Amazon
                </a>
              </div>

              <span className="book-spec info_brand_v1">{onShelves(bookObj.shelves)}</span>
            </div>
          </div>
        </div>

        {bookinfo.review?(
          <div className="book-review">
            <div className="heading">
              <hr/>
              <span>Elon’s Review</span>
              <hr/>
            </div>

            <div className="book-review__inner">
              <img src={require('../assets/img/icons/qmark1.svg')}/>
              <p>{bookinfo.review}</p>
              <img src={require('../assets/img/icons/qmark2.svg')}/>
            </div>
          </div>
        ):''}

      </div>
    )
  }
}
