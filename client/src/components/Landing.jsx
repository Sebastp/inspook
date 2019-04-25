import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import Swiper from 'swiper';

import Topbar from './Topbar'
import Footer from './Footer'
import Search from './Search'

import MostRecomBooksHeader from './LandingTopBooks'
import TopReadersHeader from './LandingTopReaders'
import LandingTodays from './LandingTodays'

import BookHalf from './BookHalf'
import CollectionMini from './CollectionMini'





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
          <div id="tagline">
            <p>Get Inspired By The Best</p>
            <h1>See Book Recommendations<br/>From <span className="hdr-light">Entrepreneurs</span></h1>
          </div>
        </header>


        <MostRecomBooksHeader/>

        <TopReadersHeader/>


        <section className="cont-width_0" id="searchSect">
          <h2 className="sect-header">Discover new Shelves</h2>

          <Search bottomMsg="Type name of a reader"/>
        </section>




        <LandingTodays/>

        <section id="blogSect" className="cont-width_fullp">
          <ul className="cont-width_2">
            {
              ['9780804139298', '9780345418913', '9780553803716'].map((bid,i)=>(
                <li key={i}>
                  <BookHalf viewReviews={true} bookId={bid}/>
                </li>
              ))
            }
          </ul>
          <span className="subMoreSpan hovEfct">
            <Link to='/reader/elon-musk'>
              See More Elon Musks Reviews
            </Link>
          </span>
        </section>


        <section id="collectionsSect" className="cont-width_0">
          <h2 className="sect-header">Collections</h2>

          <ul className='row'>
            {['best-leadership-books', 'top-pulitzer-winners'].map((item,i)=>(
              <li key={i} className="col-12 col-sm-6 col-md-4">
                <CollectionMini collId={item}/>
              </li>
            ))}
          </ul>

          <span className="subMoreSpan hovEfct">
            <Link to='/collections'>
              See All Collections
            </Link>
          </span>
        </section>



        {/* <Footer />*/}
      </Fragment>
    )
  }
}
