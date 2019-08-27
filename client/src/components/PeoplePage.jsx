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

          <header className="pageHeader">
            <div className="pageHeader__tagline centered">
              <h1>Our Reader List</h1>
              <p>Search for your Idols and find out what they are reading</p>
            </div>


            <div className="pageHeader__midrow">
              <Search bottomMsg="Search readers..." getSearchChange={this.searchPhrase}/>
              <div className="bck"/>
            </div>
          </header>


          <section className="pageMain centColumn">
            <Query query={searchPhrase=='' ? getPeople : searchString}
              variables={searchPhrase=='' ?{page: 1}:{phrase: searchPhrase, type: ['readers']}} notifyOnNetworkStatusChange>
                {({ loading, data, error, networkStatus, fetchMore }) => {
                  if (error) {
                    console.log(error.toString());
                    return null
                  }

                  var peopleData = data.getPeople,
                      searchRes = data.searchString


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
        </div>

        <Footer/>
      </Fragment>
    )
  }
}
