import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = (props) => {
  return (
    <div className="cont-width_0 errorPage">
      <header>
        <Link to={'/'}>
          <img src={require('../assets/img/logo.svg')} id="tpb-logoi" alt="logo1"/>
        </Link>
        <Link to={'/'}>
          <img src={require('../assets/img/logo name.svg')} id="tpb-logot" alt="logo2"/>
        </Link>
      </header>
      <h1>404 - Nothing's Here</h1>
      <Link to={'/'} className="subAnach">Go Back</Link>
    </div>
  )
}


export default NotFound
