import React, { Component } from 'react'
import { Link } from 'react-router-dom'


import Search from './Search'


export default class Topbar extends Component {
  render() {

    return (
      <div className='topbar'>
        <div className="topbar__inner cont-width_1">
          <header>
            <Link to={'/'}>
              <img src={require('../assets/img/logo.svg')} id="tpb-logoi" alt="logo1"/>
            </Link>
            <Link to={'/'}>
              <img src={require('../assets/img/logo name.svg')} id="tpb-logot" alt="logo2"/>
            </Link>
          </header>


          <div>
            <Search bottomMsg="Search..."/>
          </div>


          <button className="nav-toggle"></button>
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
    )
  }
}
