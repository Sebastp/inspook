import React, { Component, Fragment } from 'react'
import {Query} from 'react-apollo'

import Topbar from './Topbar'
import Search from './Search'
import PeopleList from './hocs/PeopleList'


import { getPeople } from '../graphql'


export default class PeoplePage extends Component {
  componentDidMount() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  render() {
    return (
      <Fragment>
        <Topbar/>
        <header className="pageTop cont-width_2">
          <div className="pageTop__tagline">
            <h1>Find Your Bookmate</h1>
            <p>Search our Database to find your Inspiration</p>
          </div>

          <nav className="pageTop__nav">
            <div className="navAnach active">
              Entrepreneurs
            </div>
            <div className="navAnach">
              Artists
            </div>
            <div className="navAnach">
              POLITICIANS
            </div>
            <div className="navAnach">
              SCIENTISTS
            </div>
          </nav>

          <Search bottomMsg="Type a Book Title"/>
        </header>


        <section className="pageMain">
          <Query query={getPeople} variables={{page: 1}} notifyOnNetworkStatusChange>
            {({ loading, data, error, networkStatus, fetchMore }) => {
              console.log(data, loading, networkStatus);
              if (error) {
                console.log(error.toString());
                return null
              }

              var peopleData = data.getPeople
              if (!peopleData) {
                console.error('No Data Returned');
                return null
              }
              console.log(peopleData);


              var pageSize = 20,
                  page2get = (peopleData.length/pageSize)+1

              return (
                <PeopleList
                  loading={loading}
                  lItems={peopleData}
                  onLoadMore={() =>{
                    fetchMore({
                      variables: {
                        page: page2get
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult || fetchMoreResult.getPeople.length === 0 || !Number.isInteger(page2get)){
                          return prev
                        }
                        return Object.assign({}, prev, {
                          getPeople: [...prev.getPeople, ...fetchMoreResult.getPeople]
                        });
                      }
                    })
                  }
                  }
                />
              )
            }}
          </Query>




          <span className="subMoreSpan hovEfct">
            See More
          </span>
        </section>

      </Fragment>
    )
  }
}
