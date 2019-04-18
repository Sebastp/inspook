import React from 'react'


import BookThird from './BookThird'

const LandingTodays = (props) => {
  return (
    <section id="todaysRecomm">
      <div className="cont-width_0">
        <h2 className="sect-header">Today’s Recommendations</h2>

        <ul className="books-gallery row">
          {
            ['9780804139298','9780470627600','9780743264730','9780060531041'].map((item,i)=>(
              <BookThird bookId={item} key={i}/>
            ))
          }
        </ul>
      </div>
      <div className="bck"/>
    </section>
  )
}


export default LandingTodays
