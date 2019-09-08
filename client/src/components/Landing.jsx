import React, { Component, Fragment } from 'react'
import {Query} from 'react-apollo'
import { Link } from 'react-router-dom'
import apollo from '../core/apollo'


import Topbar from './Topbar'
import Search from './Search'
import Footer from './Footer'

import MostRecomBooksHeader from './LandingTopBooks'
import LandingReaderTypes from './LandingReaderTypes'

import CollectionMini from './CollectionMini'
import ReaderMini_horizontal from './ReaderMini_horizontal'
import PersonMini_loading from './PersonMini_loading'

import { getChosenReaders } from '../graphql'



const PopularReadersArr = ["elon-musk", "richard-branson", "bill-gates", "seth-godin"],
      PopularCollectionsArr = [
        'reading-for-success', 'top-pulitzer-winners', 'best-young-adult',
        'modern-business-books', 'best-leadership-books', 'motivation-self-improvement'
      ],
      readerTypes = {
        "Entrepreneurs": ['bill-gates', 'grant-cardone', 'elon-musk'],
        "Artists": ['robert-greene', 'ernest-hemingway', 'stephen-king'],
        "Celebrities": ['casey-neistat', 'oprah-winfrey', 'tim-ferriss'],
        "Scientists": ['neil-degrasse-tyson', 'steven-pinker', 'brene-brown']
      },
      readerTypesKeys = Object.keys(readerTypes)

var readerTypesAllIds = [],
    readerTypesAllObjects = []


readerTypesKeys.map(a=>readerTypes[a].map((c)=>readerTypesAllIds.push(c)))



export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedPeople: false,
      currTypesNum: 1,
      currTypes: [readerTypesKeys[0], readerTypesKeys[1]]
    }

    document.title = 'Inspook 📘 Find your next book';



    this.headerPeopleList = (
      <Fragment>
        <li key={2511561}>
          <PersonMini_loading/>
          <PersonMini_loading/>
        </li>
        <li key={2511562}>
          <PersonMini_loading/>
          <PersonMini_loading/>
        </li>
        <li key={2511563}>
          <PersonMini_loading/>
          <PersonMini_loading/>
        </li>
      </Fragment>
    )

    apollo.query({
      query: getChosenReaders,
      variables: {uidsArr: readerTypesAllIds}
    })
    .then(({data}) => {
      readerTypesAllObjects = data.getChosenReaders
      this.changeType()
      setInterval(this.changeType.bind(this), 8000)
    })
    .catch(error => console.error(error));
  }





  changeType() {
     var {currTypesNum} = this.state,
         nextNum = (currTypesNum+1)%readerTypesKeys.length,
         typesToView = [readerTypesKeys[currTypesNum], readerTypesKeys[nextNum]],
         readersType1 = readerTypes[typesToView[0]],
         readersType2 = readerTypes[typesToView[1]]



     this.headerPeopleList = []
     this.headerPeopleList = readersType1.map((rid,i)=>(
       <li key={Math.random(8)}>
         <ReaderMini_horizontal personObj={readerTypesAllObjects.filter(r=>r.uid == rid)[0]}/>
         <ReaderMini_horizontal personObj={readerTypesAllObjects.filter(r=>r.uid == readersType2[i])[0]}/>
       </li>
     ))


     this.setState({
       currTypesNum: nextNum,
       currTypes: typesToView
     });
  }

  render() {
    const {currTypes} = this.state



    return (
      <Fragment>
        <Topbar/>

        <header id="header" className="cont-width_0">
          <div className="row header__inner">
            <div className="col" id="header__tagline">
              <p>Get Inspired By The Best</p>
              <h1>See Book Recommendations<br/><span id='fromSpan'>From</span>
                <div className="hdr-lightCont">
                  Entrepreneurs
                  {
                    currTypes.map((type,i)=>(
                      <span className="hdr-light" id={'hdrType-'+i} key={Math.random(8)}>{type}</span>
                    ))
                  }
                </div>
              </h1>
            </div>

            <ul className="col-12 col-lg-6 lo" id="header__people">
              {this.headerPeopleList}
            </ul>




          </div>
        </header>


        <MostRecomBooksHeader/>

        <section className="cont-width_0" id="searchSect">
          <div className="row" id="searchSect__inner">
            <div className="col-0 col-lg-1"/>

            <div className="col-12 col-md-6 col-lg-5">
              <Search maxResults={3} expendedHeight={311}/>
            </div>

            <div className="col-12 col-md-6 col-lg-5 colBigPading-left">
              <h2 className="sect-header">Discover new Shelves</h2>
              <p className="sub-header">
                Search Our Database and find
                favorite<br/> books by your idols
                and get inspired
              </p>
            </div>

            <div className="col-0 col-lg-1"/>
          </div>
        </section>





        <section id="collectionsSect" className="cont-width_0">
          <div className="row">
            <div className="col-0 col-lg-1"/>
            <div className="col sectHeader">
              <h2 className="sect-header_s1">Book Collections</h2>

              <span className="subMoreSpan hovEfct">
                <Link to='/collections'>
                  See All
                </Link>
              </span>
            </div>
            <div className="col-0 col-lg-1"/>
          </div>

          <ul className='row'>
            {PopularCollectionsArr.map((item,i)=>(
              <li key={i} className="col-12 col-sm-6 col-lg-4">
                <CollectionMini collId={item}/>
              </li>
            ))}
          </ul>
        </section>


        <LandingReaderTypes/>


        <Footer/>
      </Fragment>
    )
  }
}
