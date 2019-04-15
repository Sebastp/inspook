import React, { Component, Fragment } from 'react'

import { Link } from 'react-router-dom'
import {Query} from 'react-apollo'

import { getCollectionByUid } from '../graphql'


import Topbar from './Topbar'
import BookHalf from './BookHalf'



export default class Collection extends Component {
  collectionIdProp = this.props.match.params.uId

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
              var collectionObj = data.collectionByUid

              collectionObj.tagsStr = (collectionObj.tags).join('  -  ')

              console.log(collectionObj)



              return (
                <div className="collection">
                  <header className="cont-width_2">
                    <div className="collection-top">
                      <div className="collection-cover"
                        style={{
                          backgroundImage: `url(${require('../assets/img/collections/'+collectionObj.cover+'.jpg')})`
                        }}
                      />

                      <div className="collection-bck">
                        <div className="collection-bck__inner"/>
                      </div>
                    </div>

                    <h1 className="collection-title">{collectionObj.title}</h1>
                    <p className="collection-desc">{collectionObj.desc}</p>
                    <span className="collection-spec info_brand_v1">{collectionObj.tagsStr}</span>
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
                      {
                        collectionObj.books.map((bid,i)=>(
                          <li className="pageMain__bookLi" key={i}>
                            <BookHalf viewReviews={true} bookId={bid}/>
                          </li>
                        ))
                      }
                    </ul>
                  </section>

                </div>
              )

            }
          }
        </Query>
      </Fragment>
    )
  }
}
