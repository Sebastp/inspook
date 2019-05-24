import React, {Component, Fragment} from 'react'

import { Link } from 'react-router-dom'
import Dotdotdot from 'react-clamp'


import PersonMini from './PersonMini'



const readerTypes = {
    "Entrepreneurs": ['bill-gates', 'grant-cardone', 'elon-musk'],
    "Artists": ['robert-greene', 'ernest-hemingway', 'stephen-king'],
    "Celebrities": ['casey-neistat', 'oprah-winfrey', 'tim-ferriss']
  },
  readerTypesKeys = Object.keys(readerTypes)


const PopularReadersArr = ["elon-musk", "richard-branson", "bill-gates", "seth-godin"]




export default class LandingReaderTypes extends Component {
  state = {
    currTypesNum: 0,
    currType: readerTypesKeys,
  }





  changeCurrBook = (i) =>{
    if (this.mySwiper.realIndex !== i) {
      this.mySwiper.slideTo(i)
    }
    this.setState({ currBook: i });
  }





  render() {
    const { currType, currTypesNum } = this.state


    return(
      <section className="cont-width_0" id="tReadersSect">
        <div className="row" id="tReadersSect__inner">
          <div className="col-0 col-lg-1"/>

          <div className="col-12 col-lg-10 colBigPading-right" id="tReadersSect__top">
            <div>
              <h2 className="sect-header">Find Your Bookmate</h2>
              <p className="sub-header">
                See our list of Most Popular Readers
                and their favorite Books
              </p>
            </div>


            <div id="tReadersSect__nav">
              {readerTypesKeys.map((key,i)=>(
                <div className={"navAnach"+(i==currTypesNum?' active':'')}>
                  {key}
                </div>
              ))}
            </div>
          </div>

          <div className="col-0 col-lg-1"/>
        </div>

        {/* className="col-6 col-md-5 col-lg-4" */}
        <div id="tReadersSect__main">
          <div className="row">
            {PopularReadersArr.map((persUid,i)=>(
              <div key={i} className="col-12 col-md-6 personCard">
                <div className="personCard__inner">
                  <PersonMini readerUid={persUid}/>
                </div>
              </div>
            ))}
          </div>
          <div className="bck"/>
        </div>

        <div id="tReadersSect__down">
          <span className="subMoreSpan hovEfct">
            <Link to='/readers'>
              See All Readers
            </Link>
          </span>
        </div>
      </section>
    )
  }
}
