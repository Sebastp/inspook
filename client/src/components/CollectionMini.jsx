import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Query} from 'react-apollo'

import Dotdotdot from 'react-clamp'

import { getCollectionByUid } from '../graphql'

import CollectionMini_loading from './CollectionMini_loading'


export default class CollectionMini extends Component {
  render() {
    const {collId} = this.props;

    if (!collId) {
      return (<CollectionMini_loading/>)
    }


    return(
      <Query query={getCollectionByUid} variables={{uid: collId}}>
        {
          ({loading, error, data}) => {
            if (loading){
              return <CollectionMini_loading/>
            }
            if (error || !data) {
              console.log(error.toString());
              return null;
            }

            var collectionObj = data.collectionByUid

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
                  <Link to='/'>
                    {collectionObj.title}
                  </Link>
                </span>
                <span className="collectionMini-subtitle">
                  <Link to='/'>
                    {collectionObj.booksCount} Books
                  </Link>
                </span>
                <span className="collectionMini-spec">{tagsStr}</span>
              </div>
            )

          }
        }
      </Query>
    )
  }
}
