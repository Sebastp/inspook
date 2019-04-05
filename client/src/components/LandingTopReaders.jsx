import React, {Component} from 'react'
import {Query} from 'react-apollo'
import { Link } from 'react-router-dom'

import PersonMini from './PersonMini'

import { getChosenReaders } from '../graphql'

const PopularReadersArr = ["elon-musk", "richard-branson", "tony-robbins", "naval-ravikant", "bill-gates", "barack-obama", "seth-godin"]


export default class TopReadersHeader extends Component {
  state = {
    loadedPeople: false,
  }


  render() {
    return(
      <section id="tReadersSect">
        <h3 className="sect-header_s1">
          <Link to='/top-readers'>
            Top Readers
          </Link>
        </h3>

          <ul className={'cont-width_2__scroll scrollbar_1'+(this.state.loadedPeople?'':' loading')}>
            <Query query={getChosenReaders} skip={this.state.loadedPeople} variables={{uidsArr: PopularReadersArr}}>
              {
                ({loading, error, data}) => {
                  if (loading){
                    return 'loading'
                  }
                  if (error) {
                    return error.toString()
                  }

                  if (!data) {
                    return '';
                  }


                  const peopleArr = data.getChosenReaders
                  // peopleArr.concat( peopleArr)
                  var sliderSlides = peopleArr.map((item,i)=>(
                    <li key={i}>
                      <PersonMini personObj={item}/>
                    </li>
                  ))

                  return sliderSlides
                }
              }
            </Query>
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
