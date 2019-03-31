import React, { Component } from 'react'
import { Link } from 'react-router-dom'




export default class Topbar extends Component {
  render() {

    return (
      <div className='topbar'>
        <div className="grad-line"/>


        <div className="topbar__inner cont-width_1">
          <header>
            <Link to={'/'}>
              <img src={require('../assets/img/logo.svg')} id="tpb-logoi" alt="logo1"/>
            </Link>
            <Link to={'/'}>
              <img src={require('../assets/img/logo name.svg')} id="tpb-logot" alt="logo2"/>
            </Link>
          </header>


          <button className="nav-toggle"></button>
          <nav>
            <span className="nav-search">
              <img src={require('../assets/img/icons/search.svg')}/>
            </span>

            <span className="navAnach">
              <Link to={'/top-books'}>
                Top Books
              </Link>
            </span>


            <span className="navAnach">
              <Link to={'/people'}>
                People
              </Link>
            </span>

            <button className="button-filled">
              Sign In
            </button>
          </nav>
        </div>
      </div>
    )
  }
}
