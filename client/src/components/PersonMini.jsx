import React, { Component } from 'react'

import {Query} from 'react-apollo'
import { Link } from 'react-router-dom'
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'


import {bookReviews} from '../helpers/goodreads'
import { getChosenReaders } from '../graphql'

import PersonMini_loading from './PersonMini_loading'

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

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
                      <ResponsiveEllipsis
                        text={personData.displayName}
                        maxLine='1'
                        ellipsis='...'
                        trimRight
                        basedOn='letters'
                      />
                    </Link>
                  </h5>

                  <span className="person-subtitle">
                    <Link to={'/reader/'+personData.uid}>
                      {personData.booksCount} Books
                    </Link>
                  </span>
                </div>

                <Link to={'/reader/'+personData.uid}>
                  <img src={ require('../assets/img/icons/arrowr.svg') } className="person-iconr"/>
                </Link>
              </div>
            )
          }
        }
      </Query>
    )
  }
}
