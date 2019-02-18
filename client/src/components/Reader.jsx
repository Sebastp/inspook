import React, { Component, Fragment } from 'react'

import { Link } from 'react-router-dom'


import Topbar from './Topbar'
import Footer from './Footer'
import PersonMini from './PersonMini'
import BookHalf from './BookHalf'


export default class Reader extends Component {
  render() {
    return (
      <Fragment>
        <header className="reader-top">
          <Topbar/>

          <section className="top-inner">
            <div className="top-person">
              <Link to='/reader/' className="top-person-cover">
                <div className="person-cover__inner"
                  style={{
                    backgroundImage: `url(${require('../assets/img/demo/avatar.png')})`
                  }}
                  />
              </Link>


              <span className="top-person-name">
                <Link to='/reader/'>
                  Jeff Bezos
                </Link>
              </span>
              <span className="top-person-subtitle">88 Books</span>
            </div>
            
            <div className="sugestions">
              <div className="heading">
                <hr/>
                <span>You Should also see</span>
                <hr/>
              </div>

              <ul>
                {[1,2,3,4].map((item,i)=>(
                  <li key={i}>
                    <PersonMini/>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className="top-background">
            <div className="bck-shape1"
              style={{
                backgroundImage: `url(${require('../assets/img/shape1.png')})`
              }}
              />
          </div>
        </header>

        <div className="reader-books">
          <ul className="row">
            {
              [1,2,3].map((item,i)=>(
                <BookHalf key={i}/>
              ))
            }
          </ul>
        </div>


        <Footer />
      </Fragment>
    )
  }
}
