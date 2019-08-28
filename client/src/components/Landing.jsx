import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'


import Topbar from './Topbar'
import Search from './Search'
import Footer from './Footer'

import MostRecomBooksHeader from './LandingTopBooks'
import LandingReaderTypes from './LandingReaderTypes'


import CollectionMini from './CollectionMini'
import ReaderMini_horizontal from './ReaderMini_horizontal'




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



export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedPeople: false,
      currTypesNum: 1,
      currTypes: [readerTypesKeys[0], readerTypesKeys[1]],
    }
  }

  componentDidMount() {
    setInterval(this.changeType.bind(this), 8000)
  }

  changeType() {
     var {currTypesNum} = this.state,
         nextNum = (currTypesNum+1)%readerTypesKeys.length,
         typesToView = [readerTypesKeys[currTypesNum], readerTypesKeys[nextNum]]

     this.setState({
       currTypesNum: nextNum,
       currTypes: typesToView
     });
  }

  render() {
    const {currTypes} = this.state
    var readersType1 = readerTypes[currTypes[0]],
        readersType2 = readerTypes[currTypes[1]]

    return (
      <Fragment>
        <Topbar/>

        <header id="header" className="cont-width_0">
          <div className="row header__inner">
            <div className="col" id="header__tagline">
              <p>Get Inspired By The Best</p>
              <h1>See Book Recommendations<br/><span id='fromSpan'>From</span>
                <div className="hdr-lightCont">
                  {/*{currTypes[0]} longest name for placeholder*/}
                  Entrepreneurs
                  {
                    currTypes.map((type,i)=>(
                      <span className="hdr-light" id={'hdrType-'+i} key={Math.random(8)}>{type}</span>
                    ))
                  }
                </div>
              </h1>
            </div>

            <ul className="col-12 col-lg-6" id="header__people">
              {
                readersType1.map((rid,i)=>(
                  <li key={Math.random(8)}>
                    <ReaderMini_horizontal readerUid={rid}/>
                    <ReaderMini_horizontal readerUid={readersType2[i]}/>
                  </li>
                ))
              }
            </ul>
          </div>

          {/*
            <p id="header__subparagraph">{currTypes[0]}</p>
          */}
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
