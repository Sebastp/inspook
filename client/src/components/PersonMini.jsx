import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import Dotdotdot from 'react-clamp'

import {bookReviews} from '../helpers/goodreads'


export default class PersonMini extends Component {
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
    console.log(personObj);
    return (
      <div className="person">
        <Link to={'/reader/'+personObj.uid} className="person-cover">
          <div className="person-cover__inner"
            style={{
              backgroundImage: `url(${require('../assets/img/readers/'+personObj.avatar+'.jpg')})`
            }}
            />
        </Link>

        <div className="person-info">
          <h5 className="person-name">
            <Link to={'/reader/'+personObj.uid}>
              <Dotdotdot clamp={1}>
                {personObj.displayName}
              </Dotdotdot>
            </Link>
          </h5>

          <span className="person-subtitle">
            <Link to={'/reader/'+personObj.uid}>
              {personObj.booksCount} Books
            </Link>
          </span>
        </div>


        <Dotdotdot tagName='p' className="person-desc" clamp={1}>
          <Link to={'/reader/'+personObj.uid}>
              {personObj.desc}
          </Link>
        </Dotdotdot>
      </div>
    )
  }
}
