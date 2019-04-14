import React, { Component } from 'react'

import {Query} from 'react-apollo'
import { Link } from 'react-router-dom'
import Dotdotdot from 'react-clamp'

import {bookReviews} from '../helpers/goodreads'
import { getChosenReaders } from '../graphql'


export default class PersonMini extends Component {
  render() {
    const {readerUid} = this.props;

    const loadingObj = (
      <div className="person">
        <div className="person-cover">
          <div className="person-cover__inner gradient-loadAnim"/>
        </div>
        <span className="person-name">
          Loading Reader...
        </span>
      </div>
    )



    return(
      <Query query={getChosenReaders} variables={{uidsArr: [readerUid]}}>
        {
          ({loading, error, data}) => {
            if (loading){
              return loadingObj
            }
            if (error || !data) {
              console.log(error.toString());
              return null;
            }




            const personObj = data.getChosenReaders[0]


            return (
              <div className="person">
                <Link to={'/reader/'+personObj.uid} className="person-cover">
                  <div className="person-cover__inner"
                    style={{
                      backgroundImage: `url(${require('../assets/img/readers/'+personObj.avatar+'.jpg')})`
                    }}
                    />
                </Link>

                <div className="person-info">
                  <h5 className="person-name">
                    <Link to={'/reader/'+personObj.uid}>
                      <Dotdotdot clamp={1}>
                        {personObj.displayName}
                      </Dotdotdot>
                    </Link>
                  </h5>

                  <span className="person-subtitle">
                    <Link to={'/reader/'+personObj.uid}>
                      {personObj.booksCount} Books
                    </Link>
                  </span>
                </div>


                <Dotdotdot tagName='p' className="person-desc" clamp={1}>
                  <Link to={'/reader/'+personObj.uid}>
                      {personObj.desc}
                  </Link>
                </Dotdotdot>
              </div>
            )
          }
        }
      </Query>
    )
  }
}
