import React, {Fragment} from 'react'

import { Link } from 'react-router-dom'
import {Query} from 'react-apollo'

import CollectionMini from './../CollectionMini'
import { getRandomCollections } from '../../graphql'

const PageSeeNext = (props) => {
  const {ignoreUid} = props
  var ignore;
  if (ignoreUid) {
    ignore = [ignoreUid]
  }else {
    ignore = []
  }

  return (
    <section className="cont-width_0 pagebcpSeeNext">
      <div className="row">
        <div className="col-0 col-lg-1"/>
        <div className="col sectHeader">
          <h2 className="sect-header_s1">See Next</h2>

          <span className="subMoreSpan hovEfct">
            <Link to='/collections'>
              See All Collections
            </Link>
          </span>
        </div>
        <div className="col-0 col-lg-1"/>
      </div>

      <ul className='row'>
        <Query query={getRandomCollections} variables={{numToGet: 3, ignore}}>
          {
            ({loading, error, data}) => {
              if (loading){
                return <p/>
              }

              if (error) {
                console.log(error.toString());
                return null
              }

              var collectionsArr = data.getRandomCollections
              collectionsArr = collectionsArr.map(a => {return a.uid})
              return (
                <Fragment>
                  {collectionsArr.map((item,i)=>(
                    <li key={i} className="col-12 col-sm-6 col-lg-4">
                      <CollectionMini collId={item}/>
                    </li>
                  ))}
                </Fragment>
              )
            }
          }
        </Query>
      </ul>
      <div className="bck"/>
    </section>
  )
}


export default PageSeeNext
