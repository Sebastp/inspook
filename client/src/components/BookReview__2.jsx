import React from 'react'
import { Link } from 'react-router-dom'

import Dotdotdot from 'react-clamp'


const BookReview__2 = (props) => {
  const {displayName, review, uid, clampLine = 4} = props.revOjb
  if (!review) return null

  return (
    <div className="book-review">
      <span className="book-review__name info_brand_v1">
        <Link to={'/reader/'+uid}>
          {displayName}
        </Link>
      </span>

      <Link to={'/reader/'+uid} className="book-review__inner">
        <Dotdotdot tagName="p" clamp={clampLine}>
          {review}
        </Dotdotdot>
      </Link>
    </div>
  )
}



export default BookReview__2
