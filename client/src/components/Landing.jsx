import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'


import Topbar from './Topbar'
import Footer from './Footer'
import PersonMini from './PersonMini'
import Collection from './Collection'

import Swiper from 'swiper';



export default class Landing extends Component {

  componentDidMount(){
    var mySwiper = new Swiper ('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      slidesPerView: 'auto',
      spaceBetween: 80,
      centeredSlides: true,
      slidesOffsetBefore: 40,
      slidesOffsetAfter: 40,
      initialSlide: 1
    })
  }

  render() {
    return (
      <Fragment>
        <header id="header">
          <Topbar/>

          <section id="header-inner">
            <div id="tagline">
              <h1>Get Inspired By The Best</h1>
              <p>See the most Recommended Books by Successful People </p>
            </div>


            <div className="header-center row">
              <div className="heading col-10">
                <hr/>
                <span>Today's recommendations</span>
                <hr/>
              </div>

              <ul className="books-gallery col-10">
                {
                  [1,2,3].map((item,i)=>(
                    <li key={i}>
                      <span className="book-recom">Jeff Bezos Favorite</span>
                      <div className="book-center">
                        <Link to='/' className="book-cover">
                          <div className="book-cover__inner"
                            style={{
                              backgroundImage: `url(${require('../assets/img/demo/cover1.jpg')})`
                            }}
                            />
                        </Link>
                        <img className="circle" src={require('../assets/img/circle.svg')}/>
                      </div>
                      <h5 className="book-title">The Black Swan</h5>
                      <span className="book-author">Nassim Taleb</span>
                    </li>
                  ))
                }
              </ul>
            </div>
          </section>

          <div className="top-background">
            <div className="bck-shape1"
              style={{
                backgroundImage: `url(${require('../assets/img/shape1.png')})`
              }}
            />
            <div className="bck-shape2"
              style={{
                backgroundImage: `url(${require('../assets/img/shape2.png')})`
              }}
            />
          </div>
        </header>


        <section id="searchSect">
          <h2 className="sect-header">Discover new Shelves</h2>
          <input placeholder="Search Inspirations..."/>
          <button className="button-filled wide">Search</button>
        </section>


        <section id="recommSect" className="swiper-container">
          <h2 className="sect-header">Most Recommended</h2>

          <ul className="carousel swiper-wrapper">
            {[1,2,3,4,5].map((item,i)=>(
              <li className="carousel-itm swiper-slide" key={i}>
                <div className="ccard">
                  <Link to='/' className="book-cover">
                    <div className="book-cover__inner"
                      style={{
                        backgroundImage: `url(${require('../assets/img/demo/cover1.jpg')})`
                      }}
                      />
                  </Link>
                  <div className="book-info">
                    <h5>Capital in the Twenty-First Century</h5>
                    <span className="book-author">Thomas Piketty</span>

                    <div className="book-rate"><span>3.9</span>on goodreads</div>
                  </div>
                </div>
                <p className="book-recomm"><span>Recommended By</span>Bill Gates, Charles Schwab +43 others</p>
              </li>
            ))}
          </ul>
        </section>


        <section id="peopleSect">
          <h2 className="sect-header">Popular Readers</h2>

          <ul>
            {[1,2,3,4,5].map((item,i)=>(
              <li key={i}>
                <PersonMini/>
              </li>
            ))}
          </ul>
        </section>

        <section id="collectionsSect">
          <h2 className="sect-header">Most Popular Collections</h2>

          <ul>
            {[1,2].map((item,i)=>(
              <li key={i}>
                <Collection/>
              </li>
            ))}
          </ul>
        </section>


        <section id="signSect">
          <h2 className="sect-header">Show Us Your Shelf</h2>

          <button className="button-filled wide">
            <img src={require('../assets/img/icons/goodreads.svg')}/>
            Sing In
          </button>

          <button className="button-filled wide">
            <img src={require('../assets/img/icons/linkedIn.svg')}/>
            Sing In
          </button>
        </section>
        <Footer />
      </Fragment>
    )
  }
}
