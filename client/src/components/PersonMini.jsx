import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import Dotdotdot from 'react-clamp'

import {bookReviews} from '../helpers/goodreads'


export default class PersonMini extends Component {
  state = {
    bookObjs: [1,2,3]
  };


  async componentWillReceiveProps(nextProps){
    var personObj = nextProps.personObj
    if(personObj){
      var personObjBooks = personObj.books
      if (personObjBooks.length>0) {
        for (var b in personObjBooks){
          await bookReviews(personObjBooks[b].bookId).then(res=>{
            res.bookId = personObjBooks[b].bookId
            personObjBooks[b] = res
          });
        }
        this.setState({
          bookObjs: personObjBooks
        });
      }
    }
  }

  render() {
    const {personObj} = this.props;

    if (!personObj) {
      return (
        <div className="person">
          <div className="person-cover">
            <div className="person-cover__inner gradient-loadAnim"/>
          </div>
          <span className="person-name">
            Loading Reader...
          </span>
        </div>
      )
    }

    return (
      <div className="person">
        <Link to={'/reader/'+personObj.uid} className="person-cover">
          <div className="person-cover__inner"
            style={{
              backgroundImage: `url(${require('../assets/img/readers/'+personObj.avatar+'.jpg')})`
            }}
            />
        </Link>

        {personObj.books.length>0?
          <div className="person-bckbooks">
            {this.state.bookObjs.map((bookObj,i)=>(
              bookObj.cover ? (
                <Link key={i} to={'/book/'+bookObj.bookId} className="book-cover">
                  <div className="book-cover__inner"
                    style={{backgroundImage: `url(${bookObj.cover})`}}
                    />
                </Link>
              ):(
                <div key={i} className="book-cover">
                  <div className="book-cover__inner gradient-loadAnim"/>
                </div>
              )
            ))}
          </div>
          :''
        }


        <span className="person-name">
          <Link to={'/reader/'+personObj.uid}>
            <Dotdotdot clamp={1}>
              {personObj.displayName}
            </Dotdotdot>
          </Link>
        </span>



        <p className="person-desc">
          <Link to={'/reader/'+personObj.uid}>
            <Dotdotdot tagName='span' clamp={1}>
              Entrepreneur, Investor, Philanthropist
            </Dotdotdot>
          </Link>
        </p>
        <span className="person-subtitle">
          <Link to={'/reader/'+personObj.uid}>
            {personObj.booksCount} Books
          </Link>
        </span>

        <div className="person-bckname">
          {personObj.displayName}
        </div>

      </div>
    )
  }
}
