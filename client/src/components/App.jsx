import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Query } from 'react-apollo'

import { getReader } from '../graphql'


import Topbar from './Topbar'
import Footer from './Footer'
import Landing from './Landing'
import Loading from './Loading'
import Reader from './Reader'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Query query={getReader}>
            {({ loading, error, data }) => {
              if (loading) return 'loading'

              if (error) {
                return error.toString()
              }
              console.log(data);
              return '';
            }}
          </Query>
          <Switch>
            <Route exact path="/"
              component={props => (
                <Landing {...props}/>
              )}
            />

            <Route exact path="/reader"
              component={props => (
                <Reader {...props}/>
              )}
            />
          </Switch>
        </Fragment>
      </Router>
    )
  }
}
