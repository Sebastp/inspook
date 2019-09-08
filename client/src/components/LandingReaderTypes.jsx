import React, {Component} from 'react'

import { Link } from 'react-router-dom'


import PersonMini from './PersonMini'



const readerTypes = {
    "Entrepreneurs": ["elon-musk", 'richard-branson', 'bill-gates', 'tony-robbins'],
    "Authors": ['cal-newport', 'ernest-hemingway', 'stephen-king', 'jules-verne'],
    "Celebrities": ['oprah-winfrey', 'charlamagne-tha-god', 'tim-ferriss', 'casey-neistat']
  },
  readerTypesKeys = Object.keys(readerTypes)





export default class LandingReaderTypes extends Component {
  state = {
    currTypeNum: 0,
    fadingOut: 0,
    currType: readerTypesKeys[0]
  }





  changeReaderType = (i) =>{
    if (this.state.currTypeNum === i) {
      return;
    }
    this.setState({
      fadingOut: 1
    });

    setTimeout(()=>{
      this.setState({
        currTypeNum: i,
        currType: readerTypesKeys[i],
        fadingOut: 0
      });
    }, 200)
  }





  render() {
    const { currType, currTypeNum, fadingOut } = this.state


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
                <div className={"navAnach"+(i===currTypeNum?' active':'')} key={i} onClick={()=>{this.changeReaderType(i)}}>
                  {key}
                </div>
              ))}
            </div>
          </div>

          <div className="col-0 col-lg-1"/>
        </div>


        <div id="tReadersSect__main">
          <div className="row">
            {readerTypes[currType].map((persUid,i)=>(
              <div key={(i+1)+(currTypeNum*4)} className={"col-12 col-md-6 personCard"+(fadingOut?' fading':'')}>
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
            <Link to='/people'>
              See All Readers
            </Link>
          </span>
        </div>
      </section>
    )
  }
}
