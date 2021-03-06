import React, { Component } from 'react'
import { Link } from 'react-router-dom'


import Search from './Search'


export default class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNavOpen: false
    }
  }


  toggleMobileNav=()=>{
     this.setState({
       mobileNavOpen: !this.state.mobileNavOpen
     });
  }

  render() {
    const {mobileNavOpen} = this.state

    return (
      <div className='topbar'>
        <div className={"topbar__mobile"+(mobileNavOpen?' open':'')}>
          <nav className="cont-width_1">
            <span className="subAnach">
              <Link to={'/books'}>
                Books
              </Link>
            </span>


            <span className="subAnach">
              <Link to={'/people'}>
                Readers
              </Link>
            </span>

            <span className="subAnach">
              <Link to={'/collections'}>
                Collections
              </Link>
            </span>
          </nav>

          <div className="topbar__mobile-bck"/>
        </div>


        <div className="topbar__inner cont-width_1">
          <header>
            <Link to={'/'}>
              <img src={require('../assets/img/logo.svg')} id="tpb-logoi" alt="logo1"/>
            </Link>
            <Link to={'/'}>
              <img src={require('../assets/img/logo name.svg')} id="tpb-logot" alt="logo2"/>
            </Link>
          </header>


          <div className="searchCont">
            <Search bottomMsg="Search..." type="sml" maxResults={4}/>
          </div>


          <button className={"nav-toggle"+(mobileNavOpen?' open':'')} onClick={this.toggleMobileNav}></button>
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
    )
  }
}
