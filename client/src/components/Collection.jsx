import React, { Component, Fragment } from 'react'

import { Link } from 'react-router-dom'
import {Query} from 'react-apollo'

import { getCollectionByUid } from '../graphql'


import Topbar from './Topbar'
import Footer from './Footer'
import BookHalf from './BookHalf'
import BookList from './hocs/BookList'



export default class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currPage: 1
    }

    this.collectionIdProp = this.props.match.params.uId
    this.PAGE_SIZE = 20
  }


  render() {

    return (
      <Fragment>
        <Topbar/>
        <Query query={getCollectionByUid} variables={{uid: this.collectionIdProp}}>
          {
            ({loading, error, data}) => {
              if (loading){
                return 'loading'
              }

              if (error) {
                return error.toString()
              }
              var collectionObj = data.collectionByUid,
                  collection__books = (collectionObj.books).map(a=> a={bookId: a})

              collectionObj.tagsStr = collectionObj.tags.map(a=> { return a.charAt(0).toUpperCase() + a.slice(1) })
              collectionObj.tagsStr = collectionObj.tagsStr.join('  -  ')



              return (
                <div className="collection">
                  <header className="cont-width_0 pagebcpTop">
                    <div className="row">
                      <div className="col-0 col-lg-1"/>

                      <div className="collection-info col-7 col-lg-6">
                        <span className="subAnach bcp-pname">Collection</span>
                        <h1 className="collection-title bcp-title">{collectionObj.title}</h1>
                        <p className="collection-desc bcp-desc">{collectionObj.desc}</p>


                        <span className="collection-spec bcp-spec subAnach">{collectionObj.tagsStr}</span>
                      </div>


                      <div className="collection-canvas bcp-canvas col-5 col-lg-4">
                        <div className="collection-cover bcp-canvas__cover"
                          style={{
                            backgroundImage: `url(${require('../assets/img/collections/'+collectionObj.cover+'.jpg')})`
                          }}
                          />
                        <div className="collection-bck bcp-canvas__bck"
                            style={{
                              backgroundColor: '#'+collectionObj.color
                            }}
                          />
                      </div>

                      <div className="col-0 col-lg-1"/>
                    </div>
                  </header>

                  <div className="midRow cont-width_2">
                    <div className="midRow__item">
                      <span className="itmDesc">Books</span>
                      <span className="itmNum">{collectionObj.booksCount}</span>
                    </div>

                    <div className="midRow-break"/>

                    <div className="midRow__item">
                      <span className="itmDesc">Share</span>
                      <div className="itmScm">
                        <img src={ require('../assets/img/icons/fb.png') }/>
                        <img src={ require('../assets/img/icons/twt.png') }/>
                        <img src={ require('../assets/img/icons/in.png') }/>
                      </div>
                    </div>
                  </div>


                  <section className="pageMain">
                    <ul className="collection-list cont-width_2">
                      <BookList
                        lItems={collection__books.slice(0, this.PAGE_SIZE*this.state.currPage)}
                        onLoadMore={() =>{
                            if (this.PAGE_SIZE*this.state.currPage < collection__books.length) {
                              this.setState({ currPage: this.state.currPage+1 });
                            }
                          }
                        }
                      />
                    </ul>
                  </section>

                </div>
              )

            }
          }
        </Query>
        <Footer/>
      </Fragment>
    )
  }
}
