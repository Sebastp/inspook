import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'



import TopBar from './TopBar'
import Footer from './Footer'
import Loading from './Loading'


export default class Main extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <TopBar/>


          <Footer />
        </Fragment>
      </Router>
    )
  }
}
