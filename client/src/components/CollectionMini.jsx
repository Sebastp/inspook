import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Query} from 'react-apollo'

import Dotdotdot from 'react-clamp'

import { getCollectionByUid } from '../graphql'


export default class CollectionMini extends Component {
  render() {
    const {collId} = this.props;

    const loadingObj = (
      <div className="collectionMini">
        <div className="person-cover">
          <div className="person-cover__inner gradient-loadAnim"/>
        </div>
        <span className="person-name">
          Loading Reader...
        </span>
      </div>
    )



    return(
      <Query query={getCollectionByUid} variables={{uid: collId}}>
        {
          ({loading, error, data}) => {
            if (loading){
              return loadingObj
            }
            if (error || !data) {
              console.log(error.toString());
              return null;
            }

            const collectionObj = data.collectionByUid


            var tagsStr = (collectionObj.tags).join('  -  ')
            return (
              <div className="collectionMini">
                <Link to={'/collection/'+collectionObj.uid} className="collectionMini-top">
                  <div className="collectionMini-cover"
                    style={{
                      backgroundImage: `url(${require('../assets/img/collections/'+collectionObj.cover+'.jpg')})`
                    }}
                  />

                  <div className="collectionMini-bck">
                    <div className="collectionMini-bck__inner"/>
                  </div>
                </Link>


                <span className="collectionMini-name">
                  <Link to='/'>
                    {collectionObj.title}
                  </Link>
                </span>
                <span className="collectionMini-subtitle">
                  <Link to='/'>
                    {collectionObj.booksCount} Books
                  </Link>
                </span>
                <span className="collectionMini-spec info_brand_v1">{tagsStr}</span>
              </div>
            )

          }
        }
      </Query>
    )
  }
}
