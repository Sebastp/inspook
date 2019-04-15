import React from 'react'

const BookHalf_loading = (props) => {
  return (
    <div className="bookHalf loading">
      <div className="book-top">
        <div className="book-canvas">
          <div className="book-cover gradient-loadAnim">
            <div className="book-cover__inner"/>
          </div>
        </div>


        <div className="book-content">
          <div className="book-title gradient-loadAnim"/>
          <div className="book-author gradient-loadAnim"/>
        </div>
      </div>
    </div>
  )
}

export default BookHalf_loading
