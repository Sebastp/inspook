import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Query } from 'react-apollo'

import { getReader } from '../graphql'


import Landing from './Landing'
import TopBooks from './TopBooks'
import Reader from './Reader'
import Book from './Book'

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
              // console.log(data);
              return '';
            }}
          </Query>
          <Switch>
            <Route exact path="/"
              component={props => (
                <Landing {...props}/>
              )}
            />

          <Route exact path="/top-books"
              component={props => (
                <TopBooks {...props}/>
              )}
            />

            <Route exact path="/reader/:urlUid"
              component={props => (
                <Reader {...props}/>
              )}
            />

          <Route exact path="/book/:urlBookId"
              component={props => (
                <Book {...props}/>
              )}
            />
          </Switch>
        </Fragment>
      </Router>
    )
  }
}
