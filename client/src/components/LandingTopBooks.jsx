import React, {Component} from 'react'

import { Link } from 'react-router-dom'

import Dotdotdot from 'react-clamp'
import Swiper from 'swiper';

import {onShelves} from '../helpers/textTransf'
// import {createOpenLibUrl} from '../helpers/openlibrary'





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
        centeredSlides: true,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        initialSlide: 3,
        slideActiveClass: 'activeBook'
      })

      this.mySwiper.off('resize');

      //swiper does not calculate correctly transition cords
      var nowSize = this.mySwiper.width+17,
          offSite = (nowSize-682)/2;
      document.getElementsByClassName('swiper-wrapper')[0].style.marginLeft = (offSite*-1)+'px';



      this.mySwiper.on('slideChange', () => {
        this.changeCurrBook(this.mySwiper.realIndex)
        this.hoverOff()
      });
      this.mySwiper.on('touchEnd', () => {
        this.changeCurrBook(this.mySwiper.realIndex)
        this.hoverOff()
      });
    }, 200)

  }




  changeCurrBook = (i) =>{
    if (this.mySwiper.realIndex !== i) {
      this.mySwiper.slideTo(i)
    }
    this.setState({ currBook: i });
  }

  hoverOn(e){
    this.setState({ hoveredBook: e });
  }

  hoverOff(){
    this.setState({ hoveredBook: this.state.currBook });
  }



  createCoverTag(isLink, bookObj){
    if (isLink) {
      return(
        <Link to={'/book/'+bookObj.id} className="book-cover__inner"
          style={{
            backgroundImage: 1?`url(${require('../assets/img/demo/'+bookObj.cover)})`:
            `url(${require('../assets/img/demo/cover1.jpg')})`
          }}
        />
      )
    }else {
      return(
        <div className="book-cover__inner"
          style={{
            backgroundImage: 1?`url(${require('../assets/img/demo/'+bookObj.cover)})`:
            `url(${require('../assets/img/demo/cover1.jpg')})`
          }}
        />
      )
    }
  }


  render() {
    const { currBook, hoveredBook } = this.state


    return(
      <section id="mostRBooksSect" className="cont-width_0">
        <h3 className="sect-header_s1">Most Recommended Books</h3>

        <div className="swiper-container">
          <ul className="swiper-wrapper">
            {
              booksArr.map((bitm,i)=>(
                <li key={i} className={
                    "book-cover swiper-slide"+(
                      this.state.currBook===i?' activeBook':''
                    )
                  }
                  onClick={()=>{this.changeCurrBook(i)}}
                  onMouseEnter={()=>{this.hoverOn(i)}}
                  onMouseLeave={()=>{this.hoverOff()}}
                >
                  {
                    this.createCoverTag(this.state.currBook===i, booksArr[i])
                  }
                </li>
              ))
            }
          </ul>
        </div>


        <div className={'bookDown'+(hoveredBook===currBook?'':' hovered')}>
          <Dotdotdot clamp={1} className="book-title" tagName="h5">
            <Link to={'/book/'+booksArr[currBook].id}>
              {(hoveredBook===currBook)?(
                booksArr[currBook].title
              ):(
                booksArr[hoveredBook].title
              )}
            </Link>
          </Dotdotdot>
          <Dotdotdot clamp={1} className="book-author" tagName="span">
            <Link to={'/book/'+booksArr[currBook].id}>
              {booksArr[hoveredBook].author}
            </Link>
          </Dotdotdot>
          <span className="book-spec info_brand_v1">
            <Link to={'/book/'+booksArr[currBook].id}>
              {onShelves(booksArr[currBook].shelves)}
            </Link>
          </span>
        </div>

        <div className="bck"/>
      </section>
    )
  }
}
