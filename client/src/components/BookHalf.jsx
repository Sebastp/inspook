import React, { Component } from 'react'

import { Link } from 'react-router-dom'



export default class BookHalf extends Component {
  render() {
    return (
      <li className="col-6 bookHalf">
        <p className="book-recomm"><span>Recommended By</span>Bill Gates, Charles Schwab +43 others</p>
        <Link to='/' className="book-canvas">
          <div className="book-cover">
            <div className="book-cover__inner"
              style={{
                backgroundImage: `url(${require('../assets/img/demo/cover1.jpg')})`
              }}
              />
          </div>
        </Link>
        <h5 className="book-title">The Black Swan</h5>
        <span className="book-author">Nassim Taleb</span>
        <div className="book-midrow">
          <div className="book-rate"><span>3.9</span>on goodreads</div>

          <div className="book-buy">
            <span>Buy on</span>
            <a target="_blank" href='https://www.amazon.com'>
              Amazon
            </a>
          </div>
        </div>


        <div className="book-review">
          <div className="heading">
            <hr/>
            <span>Elon’s Review</span>
            <hr/>
          </div>

          <div className="book-review__inner">
            <img src={require('../assets/img/icons/qmark1.svg')}/>
              <p>Huzel & Wang book on propulsion, Asimov's Foundation, Heinlein's MiaHM</p>
            <img src={require('../assets/img/icons/qmark2.svg')}/>
          </div>
        </div>
      </li>
    )
  }
}
