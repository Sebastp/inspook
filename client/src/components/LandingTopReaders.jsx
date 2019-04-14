import React, {Component} from 'react'
import {Query} from 'react-apollo'
import { Link } from 'react-router-dom'

import PersonMini from './PersonMini'


const PopularReadersArr = ["elon-musk", "richard-branson", "tony-robbins", "naval-ravikant", "bill-gates", "barack-obama", "seth-godin"]


export default class TopReadersHeader extends Component {
  render() {
    return(
      <section id="tReadersSect">
        <h3 className="sect-header_s1">
          <Link to='/top-readers'>
            Top Readers
          </Link>
        </h3>



          <ul className='cont-width_2__scroll scrollbar_1'>
            {PopularReadersArr.map((persUid,i)=>(
              <li key={i}>
                <PersonMini readerUid={persUid}/>
              </li>
            ))}

            <span className="subMoreSpan hovEfct">
              <Link to='/top-readers'>
                See More
              </Link>
            </span>
          </ul>
      </section>
    )
  }
}
