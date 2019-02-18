import React, { Component } from 'react'
import { Link } from 'react-router-dom'




export default class Topbar extends Component {
  render() {

    return (
      <div className='topbar'>
        <header>
          <Link to={'/'}>
            <img src={require('../assets/img/logo.svg')} id="tpb-logoi"/>
          </Link>
          <Link to={'/'}>
            <img src={require('../assets/img/logo name.svg')} id="tpb-logot"/>
          </Link>
        </header>



        <nav>
          <span>
            <Link to={'/blog'}>
              Top Books
            </Link>
          </span>


          <span>
            <Link to={'/people'}>
              People
            </Link>
          </span>

          <div className="button-filled">
            Sign In
          </div>
        </nav>
      </div>
    )
  }
}
