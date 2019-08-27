import React, { Component, Fragment } from 'react'
import {Query} from 'react-apollo'

import Sticky from 'react-sticky-el';


import Topbar from './Topbar'
import Footer from './Footer'
import Search from './Search'
import CollectionList from './hocs/CollectionList'


import { getCollections, searchString } from '../graphql'


export default class CollectionsPage extends Component {
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
              <h1>Book Collections</h1>
              <p>Search for your Idols and find out what they are reading</p>
            </div>

            <div className="pageHeader__midrow">
              <Search bottomMsg="Search readers..." getSearchChange={this.searchPhrase}/>
              <div className="bck"/>
            </div>
          </header>


          <section className="pageMain centColumn">
            <Query query={searchPhrase=='' ? getCollections : searchString}
              variables={searchPhrase=='' ?{page: 1}:{phrase: searchPhrase, type: ['collections']}} notifyOnNetworkStatusChange>
                {({ loading, data, error, networkStatus, fetchMore }) => {
                  if (error) {
                    console.log(error.toString());
                    return null
                  }

                  var collectionsData = data.getCollections,
                      searchRes = data.searchString


                  if ((searchPhrase=='' && !collectionsData) || (searchPhrase!='' && !searchRes)) {
                    console.error('No Data Returned');
                    return null
                  }
                  if (searchRes && !searchRes.length) {
                    return null
                  }

                  if(searchPhrase!='') {
                    collectionsData = searchRes
                    collectionsData.map(a=>{
                      a.title = a.name
                    })
                  }




                  var pageSize = 20,
                      page2get = (collectionsData.length/pageSize)+1

                  console.log(collectionsData);

                  return (
                    <CollectionList
                      loading={loading}
                      lItems={collectionsData}
                      onLoadMore={() =>{
                        fetchMore({
                          variables: {
                            page: page2get
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult || fetchMoreResult.getCollections.length === 0 || !Number.isInteger(page2get)){
                              return prev
                            }
                            return Object.assign({}, prev, {
                              getPeople: [...prev.getCollections, ...fetchMoreResult.getCollections]
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
