import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import {Query} from 'react-apollo'

import Swiper from 'swiper';

import Topbar from './Topbar'
import Footer from './Footer'
import MostRecomBooksHeader from './LandingTopBooks'
import TopReadersHeader from './LandingTopReaders'

import BookThird from './BookThird'
import BookBlog from './BookBlog'
import Collection from './Collection'




const BlogPosts = [
  {person: "elon-musk", bookId: '9780804139021', text:'Mark Watney is a steely-eyed missile man. A man\'s man. A badass mechanical engineer botanist astronaut who is stranded on Mars during a Nasa mission gone wrong, and left to fend for himself. I listened to this on audio on a roadtrip, and it flew by - what a fun story. Not surprised at all it\'s being made into a movie directed by Ridley Scott starring Matt Damon. Also pretty amazing is that it was self-published.'},
  {person: "bill-gates", bookId: '9780399590504', text:'Tara never went to school or visited a doctor until she left home at 17. I never thought I’d relate to a story about growing up in a Mormon survivalist household, but she’s such a good writer that she got me to reflect on my own life while reading about her extreme childhood'},
  {person: "barack-obama", bookId: '9780679783268', text:'I declare after all there is no enjoyment like reading! How much sooner one tires of any thing than of a book! -- When I have a house of my own, I shall be miserable if I have not an excellent library.'}
]



export default class Landing extends Component {
  state = {
    loadedPeople: false,
  }




  render() {
    return (
      <Fragment>
        <Topbar/>

        <header id="header" className="cont-width_0">
          <div id="tagline">
            <h1>Get Inspired By The Best</h1>
            <p>See the most Recommended Books by Successful People</p>
          </div>
        </header>


        <MostRecomBooksHeader/>

        <TopReadersHeader/>



        <section id="todaysRecomm">
          <div className="cont-width_0">
            <h2 className="sect-header">Today’s Recommendations</h2>

            <ul className="books-gallery row">
              {
                ['9780813595832','9780470627600','9780743264730','9780743264730'].map((item,i)=>(
                  <BookThird bookId={item} key={i}/>
                ))
              }
            </ul>
          </div>
        </section>


        <section className="cont-width_0" id="searchSect">
          <h2 className="sect-header">Discover new Shelves</h2>

          <div className="search-center">
            <div className="search-input">
              <input placeholder="Search Inspirations..."/>
            </div>
            <span>Type name of a reader</span>
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
