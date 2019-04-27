import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import Swiper from 'swiper';

import Topbar from './Topbar'
import Search from './Search'
import Footer from './Footer'

import PersonMini from './PersonMini'
import MostRecomBooksHeader from './LandingTopBooks'

import BookHalf from './BookHalf'
import CollectionMini from './CollectionMini'
import ReaderMini_horizontal from './ReaderMini_horizontal'




const PopularReadersArr = ["elon-musk", "richard-branson", "bill-gates", "seth-godin"]


export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedPeople: false,
    }
  }



  render() {
    return (
      <Fragment>
        <Topbar/>

        <header id="header" className="cont-width_0">
          <div className="row header__inner">
            <div className="col" id="header__tagline">
              <p>Get Inspired By The Best</p>
              <h1>See Book Recommendations<br/>From <span className="hdr-light">Entrepreneurs</span></h1>
            </div>

            <ul className="col-6" id="header__people">
              {
                ['bill-gates', 'warren-buffett', 'richard-branson'].map((rid,i)=>(
                  <li key={i}>
                    <ReaderMini_horizontal readerUid={rid}/>
                  </li>
                ))
              }
            </ul>
          </div>
        </header>


        <MostRecomBooksHeader/>

        <section className="cont-width_0" id="searchSect">
          <div className="row" id="searchSect__inner">
            <div className="col-1"/>

            <div className="col-5">
              <Search maxResults={3}/>
            </div>

            <div className="col-5 colBigPading-left">
              <h2 className="sect-header">Discover new Shelves</h2>
              <p className="sub-header">
                Search Our Database and find
                favorite<br/> books by your idols
                and get inspired
              </p>
            </div>

            <div className="col-1"/>
          </div>
        </section>





        <section id="collectionsSect" className="cont-width_0">
          <div className="row">
            <div className="col-1"/>
            <div className="col sectHeader">
              <h2 className="sect-header_s1">Book Collections</h2>

              <span className="subMoreSpan hovEfct">
                <Link to='/collections'>
                  See All
                </Link>
              </span>
            </div>
            <div className="col-1"/>
          </div>

          <ul className='row'>
            {['best-leadership-books', 'top-pulitzer-winners', 'best-young-adult', 'best-leadership-books', 'top-pulitzer-winners', 'best-young-adult'].map((item,i)=>(
              <li key={i} className="col-12 col-sm-6 col-md-4">
                <CollectionMini collId={item}/>
              </li>
            ))}
          </ul>

        </section>


        <section className="cont-width_0" id="tReadersSect">
          <div className="row" id="tReadersSect__inner">
            <div className="col-1"/>

            <div className="col-5 colBigPading-right" id="tReadersSect__left">
              <div>
                <h2 className="sect-header">Find Your Bookmate</h2>
                <p className="sub-header">
                  See our list of Most Popular Readers
                  and their favorite Books
                </p>
              </div>

              <span className="subAnach">
                <Link to='/top-readers'>
                  See More
                </Link>
              </span>
            </div>

            <div className="col-5" id="tReadersSect__right">
              <ul className='cont-width_2'>
                {PopularReadersArr.map((persUid,i)=>(
                  <li key={i}>
                    <PersonMini readerUid={persUid}/>
                  </li>
                ))}
              </ul>
              <div className="bck"/>
            </div>


            <div className="col-1"/>
          </div>
        </section>

        <Footer/>
      </Fragment>
    )
  }
}
