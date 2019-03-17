import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import {Query} from 'react-apollo'

import Swiper from 'swiper';

import Topbar from './Topbar'
import Footer from './Footer'
import BookThird from './BookThird'
import BookBlog from './BookBlog'
import PersonMini from './PersonMini'
import Collection from './Collection'

import { getChosenReaders } from '../graphql'


const PopularReadersArr = ["elon-musk", "richard-branson", "tony-robbins", "naval-ravikant", "bill-gates", "barack-obama", "seth-godin"]

const BlogPosts = [
  {person: "elon-musk", bookId: '9780804139021', text:'Mark Watney is a steely-eyed missile man. A man\'s man. A badass mechanical engineer botanist astronaut who is stranded on Mars during a Nasa mission gone wrong, and left to fend for himself. I listened to this on audio on a roadtrip, and it flew by - what a fun story. Not surprised at all it\'s being made into a movie directed by Ridley Scott starring Matt Damon. Also pretty amazing is that it was self-published.'},
  {person: "bill-gates", bookId: '9780399590504', text:'Tara never went to school or visited a doctor until she left home at 17. I never thought I’d relate to a story about growing up in a Mormon survivalist household, but she’s such a good writer that she got me to reflect on my own life while reading about her extreme childhood'},
  {person: "barack-obama", bookId: '9780679783268', text:'I declare after all there is no enjoyment like reading! How much sooner one tires of any thing than of a book! -- When I have a house of my own, I shall be miserable if I have not an excellent library.'}
]



export default class Landing extends Component {
  state = {
    loadedPeople: false,
    sliderSlides: (
      <Fragment>
        {PopularReadersArr.map((item,i)=>(
          <li className="swiper-slide loading" key={i}>
            <PersonMini/>
          </li>
        ))}
      </Fragment>
    )
  }
  mySwiper=null



  componentDidUpdate(){
    this.initializeSwiper();
  }


  initializeSwiper(){
    // setTimeout(() => {
      this.mySwiper = new Swiper ('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        slidesPerView: 'auto',
        spaceBetween: 80,
        centeredSlides: true,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        initialSlide: 3
      })
      this.mySwiper.off('resize');
    // }, 200)
  }

  render() {
    return (
      <Fragment>
        <Topbar/>

        <header id="header" className="cont-width_0">
          <section id="header-inner">
            <div id="tagline">
              <h1>Get Inspired By The Best</h1>
              <p>See the most Recommended Books by Successful People</p>
            </div>
            <div id="header-buttons">
              <button className="button-filled branded1">See Most Recomended</button>
              <button className="button-filled">Search</button>
            </div>
          </section>
        </header>

        <section id="peopleSect" className="swiper-container">
          <ul className={"swiper-wrapper"+(this.state.loadedPeople?'':' loading')}>
            {this.state.sliderSlides}
            <Query query={getChosenReaders} skip={this.state.loadedPeople} variables={{uidsArr: PopularReadersArr, howManyBooks: 3}}>
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
                    <li key={i} className="swiper-slide" >
                      <PersonMini personObj={item}/>
                    </li>
                  ))

                  setTimeout(() => {

                    this.setState({
                      loadedPeople: true,
                      sliderSlides
                    })
                  }, 2000)


                  return ''
                }
              }
            </Query>
          </ul>
        </section>


        <section id="todaysRecomm">
          <div className="cont-width_0">
            <h2 className="sect-header">Today’s Stories</h2>

            <ul className="books-gallery row">
              {
                ['9780813595832','9780470627600','9780743264730'].map((item,i)=>(
                  <BookThird bookId={item} key={i}/>
                ))
              }
            </ul>
          </div>
          <div className="bckname">
            Discover New Stories
          </div>
        </section>


        <section className="cont-width_0" id="searchSect">
          <h2 className="sect-header">Discover new Shelves</h2>

          <div className="search-center">
            <span className="search-btn navAnach">
              <Link to={'/people'}>
                inspiring People
              </Link>
            </span>

            <div className="search-input">
              <input placeholder="Search Inspirations..."/>
              <button className="button-filled wide">Search</button>
            </div>

            <span className="search-btn navAnach">
              <Link to={'/top-books'}>
                top recommendations
              </Link>
            </span>
          </div>
        </section>


        <section id="blogSect" className="cont-width_fullp">
          <ul className="row">
            {
              BlogPosts.map((bpost,i)=>(
                <li key={i} className="col-12 col-md-6 col-lg-4">
                  <BookBlog bpostObj={bpost}/>
                </li>
              ))
            }
          </ul>
        </section>


        <section id="collectionsSect" className="cont-width_0">
          <h2 className="sect-header">Collections</h2>

          <ul className="row">
            {[{name: 'Top Pulitzer Winners', bookCount: '88'},{name: 'Best Business Books of 2019', bookCount: '21'}].map((item,i)=>(
              <li key={i} className="col-6">
                <Collection collObj={item}/>
              </li>
            ))}
          </ul>
        </section>



        <Footer />
      </Fragment>
    )
  }
}
