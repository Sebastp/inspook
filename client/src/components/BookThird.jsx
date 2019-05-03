import React, { Component } from 'react'
import {Query} from 'react-apollo'
import { Link } from 'react-router-dom'

import Dotdotdot from 'react-clamp'

import {bookReviews} from '../helpers/goodreads'


import { getBookReviewers } from '../graphql'


export default class BookThird extends Component {
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
    const {bookObj} = this.state
    var bookUrl = this.props.bookId;


    return (
      <li className="col-12 col-sm-6 col-md-4 col-lg-3">
        <Query query={getBookReviewers} variables={{bookid: this.props.bookId, numToGet: 1}}>
          {
            ({loading, error, data}) => {
              if (error) {
                return error.toString()
              }
              var reviewer = data.getBookReviewers

              if (!reviewer && !loading) {
                return <div className="book-recom__placholder"/>;
              }
              return (
                <Dotdotdot clamp={1}>
                  <span className="book-recom">{loading?"Loading...":reviewer+' Choice'}</span>
                </Dotdotdot>
              )
            }
          }
        </Query>
        <div className="book-center">
          <Link to='/' className="book-cover">
            <div className="book-cover__inner"
              style={{
                backgroundImage: bookObj?`url(${bookObj.cover})`:
                `url(${require('../assets/img/demo/cover1.jpg')})`
              }}
              />
          </Link>
          <img className="circle" src={require('../assets/img/circle.svg')}/>
        </div>

        <Dotdotdot clamp={2} className="book-title" tagName="h5">
          {bookObj?bookObj.title[0]:'Loading Title...'}
        </Dotdotdot>
        <Dotdotdot clamp={1} className="book-author" tagName="span">
          {bookObj?bookObj.authors[0].author[0].name[0]:'Loading Author...'}
        </Dotdotdot>
      </li>
    )
  }
}
