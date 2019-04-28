import React, {Component, Fragment} from 'react'

import { Link } from 'react-router-dom'

import Dotdotdot from 'react-clamp'
import Swiper from 'swiper';

import {onShelves} from '../helpers/textTransf'



// const booksArr = [9780061122415, 9781796356304, 9780739467350, 9780525574460, 9780061122415, 9781796356304, 9780739467350]
const booksArr = [
  {'id': 9780804139298, 'cover': 'cover1.jpg', 'title': 'Zero to One', 'author': 'Peter Thiel', "shelves": 7},
  {'id': 9781508243243, 'cover': 'cover2.jpg', 'title': 'Principles: Life and Work', 'author': 'Ray Dalio', "shelves": 7},
  {'id': 9780062316110, 'cover': 'cover3.jpg', 'title': 'Sapiens: A Brief History of Humankind', 'author': 'Yuval Noah Harari', "shelves": 6},
  {'id': 9781400062751, 'cover': 'cover4.jpg', 'title': 'Mindset: The New Psychology of Success', 'author': 'Carol S. Dweck', "shelves": 5},
  {'id': 9781524761417, 'cover': 'cover5.jpg', 'title': 'Blitzscaling', 'author': 'Reid Hoffman', "shelves": 5},
  {'id': 9781501139154, 'cover': 'cover6.jpg', 'title': 'Leonardo da Vinci', 'author': 'Walter Isaacson', "shelves": 5},
  {'id': 9780307353139, 'cover': 'cover7.jpg', 'title': 'The 4-Hour Workweek', 'author': 'Timothy Ferriss', "shelves": 4}
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
        freeModeSticky: true,
        freeModeMomentumRatio: 0.5,
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
                          backgroundImage: 1?`url(${require('../assets/img/demo/'+bitm.cover)})`:
                          `url(${require('../assets/img/demo/cover1.jpg')})`
                        }}
                        />
                    </div>

                    <div className='bookDown'>
                      <h5 clamp={1} className="book-title" tagName="h5">
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
