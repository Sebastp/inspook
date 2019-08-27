import React from 'react'
import { Link } from 'react-router-dom'

import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

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
            <ResponsiveEllipsis
              text={displayName}
              maxLine='1'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
          </Link>
        </h5>

        <span className="person-subtitle">
          <Link to={'/reader/'+uid}>
            {booksCount} Books
          </Link>
        </span>
      </div>


      <Link to={'/reader/'+uid} className="book-review__inner">
        <ResponsiveEllipsis
          text={review}
          maxLine='4'
          ellipsis='...'
          trimRight
          basedOn='letters'
          component="p"
        />
      </Link>
    </div>
  )
}



export default BookReview
