import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import Landing from './Landing'
import TopBooksPage from './TopBooksPage'
import CollectionsPage from './CollectionsPage'
import PeoplePage from './PeoplePage'
import Reader from './Reader'
import Book from './Book'
import Collection from './Collection'
import NotFound from './NotFound'
import { ModalProvider } from './ModalContext';




export default class App extends Component {
  ScrollToTop() {
    window.scrollTo(0, 0);
    return null;
  }

  render() {
    return (
      <Router>
        <Fragment>
          <ModalProvider>
            <Route component={this.ScrollToTop} />

            <Switch>
              <Route exact path="/"
                component={props => (
                  <Landing {...props}/>
                )}
              />

              <Route exact path="/books"
                component={props => (
                  <TopBooksPage {...props}/>
                )}
              />

              <Route exact path="/people"
                component={props => (
                  <PeoplePage {...props}/>
                )}
              />

              <Route exact path="/collections"
                component={props => (
                  <CollectionsPage {...props}/>
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

              <Route exact path="/collection/:uId"
                component={props => (
                  <Collection {...props}/>
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </ModalProvider>

        </Fragment>
      </Router>
    )
  }
}
