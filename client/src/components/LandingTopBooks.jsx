import React, {Component, Fragment} from 'react'

import { Link } from 'react-router-dom'

import Dotdotdot from 'react-clamp'
import Swiper from 'swiper';

import {onShelves} from '../helpers/textTransf'




const booksArr = [
  {'id': 9780804139298, 'cover': 'zerotoone.jpg', 'title': 'Zero to One', 'author': 'Peter Thiel', "shelves": 7},
  {'id': 9781508243243, 'cover': 'principles.jpg', 'title': 'Principles: Life and Work', 'author': 'Ray Dalio', "shelves": 7},
  {'id': 9780062316110, 'cover': 'sapiens.jpg', 'title': 'Sapiens: A Brief History of Humankind', 'author': 'Yuval Noah Harari', "shelves": 6},
  {'id': 9781400062751, 'cover': 'mindset.jpg', 'title': 'Mindset', 'author': 'Carol S. Dweck', "shelves": 5},
  {'id': 9781524761417, 'cover': 'blitzscaling.jpg', 'title': 'Blitzscaling', 'author': 'Reid Hoffman', "shelves": 5},
  {'id': 9781501139154, 'cover': 'leonardodavinci.jpg', 'title': 'Leonardo da Vinci', 'author': 'Walter Isaacson', "shelves": 5},
  {'id': 9780307353139, 'cover': '4hourworkweek.jpg', 'title': 'The 4-Hour Workweek', 'author': 'Timothy Ferriss', "shelves": 4}
]


export default class MostRecomBooksHeader extends Component {
  state = {
    currBook: 3,
    hoveredBook: 3
  }

  mySwiper=null

  componentDidMount(){
    this.initializeSwiper();
  }


  initializeSwiper(){
    setTimeout(() => {
      this.mySwiper = new Swiper ('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        slidesPerView: 'auto',
        freeMode: true,
        freeModeMomentumRatio: 0.4,
        freeModeMomentumVelocityRatio: 0.4,
        // centeredSlides: true,
        spaceBetween: 80,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        initialSlide: 0,
        slideActiveClass: 'activeBook'
      })

      this.mySwiper.off('resize');

      //swiper does not calculate correctly transition cords
      var nowSize = this.mySwiper.width+17,
          offSite = (nowSize-682)/2;
      // document.getElementsByClassName('swiper-wrapper')[0].style.marginLeft = (offSite*-1)+'px';



      this.mySwiper.on('slideChange', () => {
        this.changeCurrBook(this.mySwiper.realIndex)
      });
      this.mySwiper.on('touchEnd', () => {
        this.changeCurrBook(this.mySwiper.realIndex)
      });
    }, 200)
  }




  changeCurrBook = (i) =>{
    if (this.mySwiper.realIndex !== i) {
      this.mySwiper.slideTo(i)
    }
    this.setState({ currBook: i });
  }





  render() {
    const { currBook, hoveredBook } = this.state


    return(
      <Fragment>
        <section id="mostRBooksSect" className="cont-width_0">
          <div className="swiper-container">
            <ul className="swiper-wrapper">
              {
                booksArr.map((bitm,i)=>(

                  <li key={i} className={
                      "swiper-slide"+(
                        this.state.currBook===i?' activeBook':''
                      )
                    }
                    onClick={()=>{this.changeCurrBook(i)}}
                  >
                    <div className="book-cover">
                      <Link to={'/book/'+bitm.id} className="book-cover__inner"
                        style={{
                          backgroundImage: 1?`url(${require('../assets/img/books/'+bitm.cover)})`:
                          `url(${require('../assets/img/noBookCover.jpg')})`
                        }}
                        />
                    </div>

                    <div className='bookDown'>
                      <h5 className="book-title">
                        <Link to={'/book/'+bitm.id}>
                          {bitm.title}
                        </Link>
                      </h5>
                      <Dotdotdot clamp={1} className="book-author" tagName="span">
                        <Link to={'/book/'+bitm.id}>
                          {bitm.author}
                        </Link>
                      </Dotdotdot>
                      <span className="book-spec">
                        <Link to={'/book/'+bitm.id}>
                          {onShelves(bitm.shelves)}
                        </Link>
                      </span>
                    </div>
                  </li>


                ))
              }
            </ul>
          </div>

          <div className="bck"/>
        </section>
        <p id="mostRBooksSect-subparagraph">Most Recommended Books</p>
      </Fragment>
    )
  }
}
