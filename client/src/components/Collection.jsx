import React, { Component, Fragment } from 'react'

import { Link } from 'react-router-dom'
import {Query} from 'react-apollo'
import Dotdotdot from 'react-clamp'


import { getCollectionByUid } from '../graphql'


import Topbar from './Topbar'
import Footer from './Footer'
import BookHalf from './BookHalf'
import BookList from './hocs/BookList'
import PageSeeNext from './partials/PageSeeNext'



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
                <div className="collectionPage">
                  <header className="cont-width_0 pagebcpTop">
                    <div className="row">
                      <div className="col-0 col-lg-1"/>
                      <div className="collection-info bcp-info col">
                        <span className="subAnach bcp-pname">Collection</span>
                        <h1 className="collection-title bcp-title">{collectionObj.title}</h1>
                        <p className="collection-desc bcp-desc">{collectionObj.desc}</p>

                        <div className="collectionPage-specs bcp-spec">
                          <p>Books {collectionObj.booksCount}</p>
                        </div>
                        {/*<span className="collection-spec bcp-spec subAnach">{collectionObj.tagsStr}</span>*/}
                      </div>
                      <div className="col-0 col-lg-1"/>
                    </div>

                    <div className="collection-canvas bcp-canvas">
                      <div className="collection-cover bcp-canvas__cover"
                        style={{
                          backgroundImage: `url(${require('../assets/img/collections/'+collectionObj.cover+'.jpg')})`
                        }}
                      />
                      <div className="collection-bck bcp-canvas__bck"
                        style={{ backgroundColor: '#'+collectionObj.color }}
                      />
                    </div>

                    <p className="bcp-subparagraph">{collectionObj.desc}</p>
                  </header>



                  <section className="pagebcpMain cont-width_0">
                    <div className="row">
                      <div className="col-6 colBigPading-right">

                        <Dotdotdot clamp={3} className="pagebcpMain-leftDesc" tagName="p">
                          {collectionObj.desc}
                        </Dotdotdot>
                      </div>

                      <ul className="col-6 bookPage-revUl">
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
                    </div>
                  </section>



                </div>
              )

            }
          }
        </Query>
        <PageSeeNext ignoreUid={this.collectionIdProp}/>
        <Footer/>
      </Fragment>
    )
  }
}
