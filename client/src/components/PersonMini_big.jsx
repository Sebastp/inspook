import React, { Component } from 'react'

import {Query} from 'react-apollo'
import { Link } from 'react-router-dom'

import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)






export default class PersonMini_big extends Component {
  render() {
    const {readerUid, personObj} = this.props;



    return(
      <div className="PersonMini_big">
        <div className="PersonMini_big-canvas">
          <Link to={'/reader/'+personObj.uid} className="PersonMini_big-cover">
            <div className="PersonMini_big-cover__inner"
              style={{
                backgroundImage: `url(${require('../assets/img/readers/'+personObj.avatar+'.jpg')})`
              }}
              />
          </Link>
        </div>

        <div className="PersonMini_big-right">
          <div className="PersonMini_big-info">

            <div className="PersonMini_big-info__left">
              <span className="PersonMini_big-tag subAnach">
                Politician
                {/*TODO: change to tag from graphql*/}
              </span>

              <h5 className="PersonMini_big-name">
                <Link to={'/reader/'+personObj.uid}>
                  <ResponsiveEllipsis
                    text={personObj.displayName}
                    maxLine='1'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                  />
                </Link>
              </h5>
            </div>

            <span className="PersonMini_big-subtitle">
              <Link to={'/reader/'+personObj.uid}>
                {personObj.booksCount} Books
              </Link>
            </span>
          </div>

          <p className="PersonMini_big-desc">
            <Link to={'/reader/'+personObj.uid}>
              {personObj.desc}
            </Link>
          </p>
        </div>
      </div>
    )
  }
}
