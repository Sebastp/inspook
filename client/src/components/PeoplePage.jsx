import React, { Component, Fragment } from 'react'
import {Query} from 'react-apollo'

import Sticky from 'react-sticky-el';


import Topbar from './Topbar'
import Footer from './Footer'
import Search from './Search'
import PeopleList from './hocs/PeopleList'


import { getPeople, searchString } from '../graphql'


export default class PeoplePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchPhrase: ''
    }
  }


  componentDidMount() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  searchPhrase = (phrase) => {
    console.log(phrase)
    this.setState({
      searchPhrase: phrase
    });
  }

  render() {
    const { searchPhrase } = this.state


    return (
      <Fragment>
        <Topbar/>

        <div className="cont-width_0">
          <div className="row justify-content-center">
            {/*<div className="col-0 col-lg-1"/>*/}
              <header className="pageHeader colBigPading-right col-12 col-lg-6 col-xl-5">
                <Sticky className="stickyHeader" topOffset={-70} boundaryElement=".cont-width_0">
                  <div className="pageHeader__tagline">
                    <h1>Readers</h1>
                    <p>Search for your Idols and find out what they are reading</p>
                  </div>

                  {/*
                    <nav className="pageHeader__nav">
                    <div className="navAnach active">
                    Entrepreneurs
                    </div>
                    <div className="navAnach">
                    Artists
                    </div>
                    <div className="navAnach">
                    Politicians
                    </div>
                    <div className="navAnach">
                    Scientists
                    </div>
                    </nav>
                    */}

                  <Search bottomMsg="Search readers..." getSearchChange={this.searchPhrase}/>
                </Sticky>
                <div className="pageHeader-divline"/>
              </header>


              <section className="pageMain col-12 col-lg-6">
                <Query query={searchPhrase=='' ? getPeople : searchString}
                  variables={searchPhrase=='' ?{page: 1}:{phrase: searchPhrase, type: ['readers']}} notifyOnNetworkStatusChange>
                  {({ loading, data, error, networkStatus, fetchMore }) => {
                    if (error) {
                      console.log(error.toString());
                      return null
                    }

                    var peopleData = data.getPeople,
                        searchRes = data.searchString

                        console.log(data);
                    if ((searchPhrase=='' && !peopleData) || (searchPhrase!='' && !searchRes)) {
                      console.error('No Data Returned');
                      return null
                    }
                    if (searchRes && !searchRes.length) {
                      return null
                    }

                    if(searchPhrase!='') {
                      peopleData = searchRes
                      peopleData.map(a=>{
                        a.displayName = a.name
                        a.avatar = a.cover
                      })
                    }




                    var pageSize = 20,
                        page2get = (peopleData.length/pageSize)+1

                    console.log(peopleData);

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
            </section>
            {/*<div className="col-0 col-lg-1"/>*/}
          </div>
        </div>
        <Footer/>
      </Fragment>
    )
  }
}
