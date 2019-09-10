import React from 'react'
import { Link } from 'react-router-dom'

const Footer = (props) => {
  return (
    <footer className="cont-width_0">
      <div className="row">
        <div className="col footer__left">
          <h3>Read who You<wbr/> want to be</h3>
        </div>

        <div className="col-5 col-md-4 footer__right">
          <div className="findus">
            <h4>
              Find Us
            </h4>
            <div className="findus-sm">
              <a target="_blank" href="https://www.facebook.com/inspook/" className="findus-icon">
                <img src={ require('../assets/img/icons/fb.svg') } alt="facebook icon"/>
              </a>
              {/*<img src={ require('../assets/img/icons/twt.png') } alt="twiter icon" className="findus-icon"/>*/}
              <a target="_blank" href="https://www.instagram.com/socrades.studio/" className="findus-icon">
                <img src={ require('../assets/img/icons/inst.svg') } alt="instagram icon"/>
              </a>
            </div>
          </div>

          <nav>
            <span className="navAnach">
              <Link to={'/books'}>
                Books
              </Link>
            </span>


            <span className="navAnach">
              <Link to={'/people'}>
                Readers
              </Link>
            </span>

            <span className="navAnach">
              <Link to={'/collections'}>
                Collections
              </Link>
            </span>
          </nav>
        </div>




      </div>
      <p className="downMsg">Some data comes from our kind friends at <a href="https://www.goodreads.com/">GoodReads</a>   © 2019 Inspook. All rights reserved.
      </p>
    </footer>
  )
}


export default Footer
