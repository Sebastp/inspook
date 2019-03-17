import React, { Component } from 'react'
import {Query} from 'react-apollo'
import { Link } from 'react-router-dom'

import Dotdotdot from 'react-clamp'

import {bookReviews} from '../helpers/goodreads'


import { getChosenReaders } from '../graphql'


export default class BookBlog extends Component {
  state = {
    bookObj: false
  };

  componentDidMount(){
    var {bpostObj} = this.props;
    bookReviews(bpostObj.bookId).then(res=>{
      this.setState({
        bookObj: res
      });
    });
  }

  render() {
    const {bookObj} = this.state
    var {bpostObj} = this.props;


    return (
      <div className="bookBlog">
        <div className="book-center">
          <Link to={'/book/'+bpostObj.bookId} className="book-cover">
            <div className="book-cover__inner"
              style={{
                backgroundImage: `url(${bookObj.cover})`
              }}
              />
          </Link>
          <img className="circle" src={require('../assets/img/circle.svg')}/>
        </div>

        <h5 className="book-title">
          <Link to={'/book/'+bpostObj.bookId}>
            <Dotdotdot clamp={2}>
              {bookObj?bookObj.title[0]:'Loading Title...'}
            </Dotdotdot>
          </Link>
        </h5>
        <span className="book-author">
          {bookObj?bookObj.authors[0].author[0].name[0]:'Loading Author...'}
        </span>
        <Dotdotdot tagName='p' clamp={7} className="book-story">
          {bpostObj.text}
        </Dotdotdot>


        <Query query={getChosenReaders} variables={{uidsArr: bpostObj.person, getBooksCount: false}}>
          {
            ({loading, error, data}) => {
              if (loading){
                return (
                  <div className="bookBlog-person">
                    <div className="person-cover">
                      <div className="person-cover__inner"/>
                    </div>
                    <span className="person-name">
                      <Dotdotdot clamp={1}>
                        Loading Reader...
                      </Dotdotdot>
                    </span>
                  </div>
                )
              }
              if (error) {
                return error.toString()
              }

              var personObj = data.getChosenReaders[0]

              return(
                <div className="bookBlog-person">
                  <Link to={'/reader/'+personObj.uid} className="person-cover">
                    <div className="person-cover__inner"
                      style={{
                        backgroundImage: `url(${require('../assets/img/readers/'+personObj.avatar+'.jpg')})`
                      }}
                      />
                  </Link>
                  <span className="person-name">
                    <Link to={'/reader/'+personObj.uid}>
                      <Dotdotdot clamp={1}>
                        {personObj.displayName}
                      </Dotdotdot>
                    </Link>
                  </span>
                </div>
              )
            }
          }
        </Query>
      </div>
    )
  }
}
