import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Query} from 'react-apollo'


import { getCollectionByUid } from '../graphql'

import CollectionMini_loading from './CollectionMini_loading'


export default class CollectionMini extends Component {
  render() {
    const {collId, collectionObjPassed} = this.props;

    if (!collId && !collectionObjPassed) {
      return null
      // return (<CollectionMini_loading/>)
    }


    return(
      <Query query={getCollectionByUid} skip={collectionObjPassed} variables={{uid: collId}}>
        {
          ({loading, error, data}) => {
            if (loading){
              return <CollectionMini_loading/>
            }
            error && ( console.log(error.toString()) )

            if ((error || !data) && !collectionObjPassed) {
              return null;
            }

            var collectionObj = collectionObjPassed ? collectionObjPassed : data.collectionByUid


            var tagsStr = collectionObj.tags.map(a=> { return a.charAt(0).toUpperCase() + a.slice(1) })
            tagsStr = tagsStr.join('  -  ')
            return (
              <div className="collectionMini">
                <Link to={'/collection/'+collectionObj.uid} className="collectionMini-top">
                  <div className="collectionMini-cover"
                    style={{
                      backgroundImage: `url(${require('../assets/img/collections/'+collectionObj.cover+'.jpg')})`
                    }}
                  />

                  <div className="collectionMini-bck"
                    style={{
                      backgroundColor: '#'+collectionObj.color
                    }}
                  />
                </Link>


                <span className="collectionMini-name">
                  <Link to={'/collection/'+collectionObj.uid}>
                    {collectionObj.title}
                  </Link>
                </span>
                <span className="collectionMini-subtitle">
                  <Link to={'/collection/'+collectionObj.uid}>
                    {collectionObj.booksCount} Books
                  </Link>
                </span>
                <span className="collectionMini-spec">
                  <Link to={'/collection/'+collectionObj.uid}>
                    {tagsStr}
                  </Link>
                </span>
              </div>
            )

          }
        }
      </Query>
    )
  }
}
