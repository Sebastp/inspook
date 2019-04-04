import React, {Component, Fragment} from 'react'
import { Link } from 'react-router-dom'

import Dotdotdot from 'react-clamp'
import {onShelves} from '../helpers/textTransf'



// const booksArr = [9780061122415, 9781796356304, 9780739467350, 9780525574460, 9780061122415, 9781796356304, 9780739467350]
const booksArr = [
  {'id': 9780061122415, 'cover': 'cover1.jpg', 'title': 'The Black Swan', 'author': 'Nassim Taleb', "shelves": 98},
  {'id': 9781796356304, 'cover': 'cover2.jpg', 'title': 'The Blue Flowers', 'author': 'The Blue Flowers', "shelves": 55},
  {'id': 9780739467350, 'cover': 'cover3.jpg', 'title': 'The Blue Flowers', 'author': 'The Blue Flowers', "shelves": 41},
  {'id': 9780525574460, 'cover': 'cover4.jpg', 'title': 'The Blue Flowers', 'author': 'Raymond Queneau', "shelves": 30},
  {'id': 9780061122415, 'cover': 'cover5.jpg', 'title': 'Siddhartha', 'author': 'Hermann Hesse', "shelves": 28},
  {'id': 9781796356304, 'cover': 'cover6.jpg', 'title': 'The Blue Flowers', 'author': 'The Blue Flowers', "shelves": 21},
  {'id': 9780739467350, 'cover': 'cover7.jpg', 'title': 'The Blue Flowers', 'author': 'The Blue Flowers', "shelves": 18}
]


export default class MostRecomBooksHeader extends Component {
  state = {
    currBook: 3,
    hoveredBook: 3,
  }


  changeCurrBook(i){
    this.setState({ currBook: i });
  }

  hoverOn(e){
    this.setState({ hoveredBook: e });
  }

  hoverOff(){
    this.setState({ hoveredBook: this.state.currBook });
  }



  render() {
    const { currBook, hoveredBook } = this.state

    return(
      <section id="mostRBooksSect" className="cont-width_0">
        <h3 className="sect-header_s1">Most Recommended Books</h3>
        <ul>
          {
            booksArr.map((bitm,i)=>(
              <li key={i} className={
                  "book-cover"+(
                    this.state.currBook==i?' activeBook':''
                  )
                }
                onClick={()=>{this.changeCurrBook(i)}}
                onMouseEnter={()=>{this.hoverOn(i)}}
                onMouseLeave={()=>{this.hoverOff()}}
              >
                <div className="book-cover__inner"
                  style={{
                    backgroundImage: 1?`url(${require('../assets/img/demo/'+booksArr[i].cover)})`:
                    `url(${require('../assets/img/demo/cover1.jpg')})`
                  }}
                  />
              </li>
            ))
          }
        </ul>



        <div className={'bookDown'+(hoveredBook==currBook?'':' hovered')}>
          <Dotdotdot clamp={1} className="book-title" tagName="h5">
            <Link to={'/book/'+booksArr[currBook].id}>
              {/* {bookObj?bookObj.title[0]:'Loading Title...'}*/}
              {(hoveredBook==currBook)?(
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
          <span className="book-spec info_brand_v1">{onShelves(booksArr[currBook].shelves)}</span>
        </div>
      </section>
    )
  }
}
