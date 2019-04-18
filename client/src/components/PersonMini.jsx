import React, { Component } from 'react'

import {Query} from 'react-apollo'
import { Link } from 'react-router-dom'
import Dotdotdot from 'react-clamp'


import {bookReviews} from '../helpers/goodreads'
import { getChosenReaders } from '../graphql'

import PersonMini_loading from './PersonMini_loading'


export default class PersonMini extends Component {
  render() {
    const {readerUid, personObj} = this.props;



    return(
      <Query query={getChosenReaders} skip={personObj} variables={{uidsArr: [readerUid]}}>
        {
          ({loading, error, data}) => {
            if (loading){
              return <PersonMini_loading/>
            }
            error && ( console.log(error.toString()) )

            if ((error || !data) && !personObj) {
              return null;
            }

            const personData = personObj ? personObj : data.getChosenReaders[0]





            return (
              <div className="person">
                <Link to={'/reader/'+personData.uid} className="person-cover">
                  <div className="person-cover__inner"
                    style={{
                      backgroundImage: `url(${require('../assets/img/readers/'+personData.avatar+'.jpg')})`
                    }}
                    />
                </Link>

                <div className="person-info">
                  <h5 className="person-name">
                    <Link to={'/reader/'+personData.uid}>
                      <Dotdotdot clamp={1}>
                        {personData.displayName}
                      </Dotdotdot>
                    </Link>
                  </h5>

                  <span className="person-subtitle">
                    <Link to={'/reader/'+personData.uid}>
                      {personData.booksCount} Books
                    </Link>
                  </span>
                </div>


                <Dotdotdot tagName='p' className="person-desc" clamp={1}>
                  <Link to={'/reader/'+personData.uid}>
                      {personData.desc}
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
