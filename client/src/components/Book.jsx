import React, {Component, Fragment} from 'react'
import {Query} from 'react-apollo'
import {Link} from 'react-router-dom'


import Topbar from './Topbar'
import Footer from './Footer'

import {bookReviews} from '../helpers/goodreads'

import { getBookAsInfo } from '../graphql'

export default class Reader extends Component {
  state = {
    bookObj: false
  }

  BookIdProp = this.props.match.params.urlBookId
  bookId = this.BookIdProp.split('_').slice(-1)[0]

  componentDidMount(){
    bookReviews(this.bookId).then(res=>{
      this.setState({
        bookObj: res
      });
    });
  }


  render() {
    const {bookObj} = this.state

    console.log(this.bookId);
    console.log(bookObj);

    return (<Fragment>
      <Query query={getBookAsInfo} variables={{bookid: this.bookId}}>
        {
          ({loading, error, data}) => {
            if (loading){
              return 'loading'
            }

            if (error) {
              return error.toString()
            }
            var bookData = data.getBookAsInfo,
                bRecomms = bookData.recomms
            console.log(bookData.recomms);



            return (
              <Fragment>
              <header className="reader-top">
                <Topbar/>
                <section className="top-inner">

                  <div className="book-canvas">
                    <div className="book-cover">
                      <div className="book-cover__inner"
                        style={{
                          backgroundImage: bookObj?`url(${bookObj.image_url[0]})`:`url(${require('../assets/img/demo/cover1.jpg')})`
                        }}
                        />
                    </div>
                  </div>
                  <h5 className="book-title">{bookObj?bookObj.title[0]:'Loading Title...'}</h5>
                  <span className="book-author">{bookObj?bookObj.authors[0].author[0].name[0]:'Loading Author...'}</span>
                  <div className="book-midrow">
                    <div className="book-rate"><span>{bookObj?bookObj.average_rating[0]:'0.0'}</span>on goodreads</div>
                    <div className="book-recomm"><span>{bookObj?bRecomms.length:'0'}</span>recommendation</div>

                    <div className="book-buy">
                      <span>Buy on</span>
                      <a target="_blank" href='https://www.amazon.com'>
                        Amazon
                      </a>
                    </div>
                  </div>
                </section>

              </header>


              {bRecomms.length?(
                <div className="row book-revies">
                  <div className="heading col-12">
                    <hr/>
                    <span>Reviews</span>
                    <hr/>
                  </div>

                  {bRecomms.map((item, i) => (
                    <div className="book-review__li col-12 col-md-6">
                      <img src={require('../assets/img/icons/qmark1.svg')}/>
                      <p>{item.review}</p>
                      <img src={require('../assets/img/icons/qmark2.svg')}/>
                      <span>{'- '+item.name}</span>
                    </div>
                  ))}

                </div>
              ):''}


            </Fragment>
          )
          }
        }
      </Query>

      <Footer/>
    </Fragment>
  )
  }
}
