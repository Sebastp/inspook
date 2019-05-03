import React from 'react'
import { Link } from 'react-router-dom'

import Dotdotdot from 'react-clamp'
// import PersonMini from './PersonMini'


const BookReview = (props) => {
  const {displayName, avatar, booksCount, review, uid} = props.revOjb

  return (
    <div className="book-review">
      <Link to={'/reader/'+uid} className="person-cover">
        <div className="person-cover__inner"
          style={{
            backgroundImage: `url(${require('../assets/img/readers/'+avatar+'.jpg')})`
          }}
          />
      </Link>

      <div className="person-info">
        <h5 className="person-name">
          <Link to={'/reader/'+uid}>
            <Dotdotdot clamp={1}>
              {displayName}
            </Dotdotdot>
          </Link>
        </h5>

        <span className="person-subtitle">
          <Link to={'/reader/'+uid}>
            {booksCount} Books
          </Link>
        </span>
      </div>


      <Link to={'/reader/'+uid} className="book-review__inner">
        <Dotdotdot tagName="p" clamp={4}>
          {review}
        </Dotdotdot>
      </Link>
    </div>
  )
}



export default BookReview
