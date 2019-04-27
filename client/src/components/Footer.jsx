import React from 'react'
import { Link } from 'react-router-dom'

const Footer = (props) => {
  return (
    <footer className="cont-width_0">
      <div className="row">
        <div className="col">
          <h3>Read who You want to be</h3>
        </div>

        <div className="col-4">
          <div className="findus">
            <h4>
              Find Us
            </h4>
            <div className="findus-sm">
              <img src={ require('../assets/img/icons/fb.png') } className="findus-icon"/>
              <img src={ require('../assets/img/icons/twt.png') } className="findus-icon"/>
              <img src={ require('../assets/img/icons/in.png') } className="findus-icon"/>
            </div>
          </div>

          <nav>
            <span className="navAnach">
              <Link to={'/top-books'}>
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
    </footer>
  )
}


export default Footer
