import React, {Component} from 'react'
import {Query} from 'react-apollo'

import PersonMini from './PersonMini'

import { getChosenReaders } from '../graphql'

const PopularReadersArr = ["elon-musk", "richard-branson", "tony-robbins", "naval-ravikant", "bill-gates", "barack-obama", "seth-godin"]


export default class TopReadersHeader extends Component {
  state = {
    loadedPeople: false,
  }

  render() {
    return(
      <section id="peopleSect" className="swiper-container">
        <ul className={"swiper-wrapper"+(this.state.loadedPeople?'':' loading')}>
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

                this.setState({
                  loadedPeople: true
                })
                return sliderSlides
              }
            }
          </Query>
        </ul>
      </section>
    )
  }
}
