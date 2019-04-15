import React, {Component, Fragment} from 'react'
import {Query} from 'react-apollo'

import {Link} from 'react-router-dom'



import Topbar from './Topbar'
import PersonMini from './PersonMini'
import BookHalf from './BookHalf'

import { getReaderPage, getRandomReaders } from '../graphql'

export default class Reader extends Component {
  render() {
    const urlUid = this.props.match.params.urlUid

    return (
      <Fragment>
        <Topbar/>
          <Query query={getReaderPage} variables={{uid: urlUid}}>
            {
              ({loading, error, data}) => {
                if (loading){
                  return 'loading'
                }

                if (error) {
                  return error.toString()
                }
                var readerObj = data.getByUid;
                if (!readerObj) {
                  return null
                }



                var reader_uid = readerObj.uid,
                    reader_name = readerObj.displayName,
                    reader_desc = readerObj.desc,
                    reader_tags = 'Entrepreneur',
                    reader_books = readerObj.books,
                    reader_avatarName = readerObj.avatar ? readerObj.avatar : readerObj.uid,
                    reader_avatar = require('../assets/img/readers/'+ reader_avatarName +'.jpg')

                reader_books.map(e => {
                  e.uid = reader_uid
                  e.displayName = reader_name
                  return e;
                })



                return (
                  <div className="readerPage">
                    <header className="cont-width_2">
                      <div className="readerPage-top">
                        <div className="readerPage-cover"
                          style={{
                            backgroundImage: `url(${reader_avatar})`
                          }}
                        />
                      </div>


                      <h1 className="readerPage-name">{reader_name}</h1>
                      <p className="readerPage-desc">{reader_desc}</p>
                      <span className="readerPage-tags info_brand_v1">{reader_tags}</span>
                    </header>

                    <div className="midRow cont-width_2">
                      <div className="midRow__item">
                        <span className="itmDesc">Books</span>
                        <span className="itmNum">{reader_books.length}</span>
                      </div>

                      <div className="midRow-break"/>

                      <div className="midRow__item">
                        <span className="itmDesc">Share</span>
                        <div className="itmScm">
                          <img src={ require('../assets/img/icons/fb.png') }/>
                          <img src={ require('../assets/img/icons/twt.png') }/>
                          <img src={ require('../assets/img/icons/in.png') }/>
                        </div>
                      </div>
                    </div>

                    <section className="pageMain">
                      <h3 className="sect-header_s1">Bookshelf</h3>

                      <ul className="cont-width_2">
                        {
                          reader_books.map((bid,i)=>(
                            <li className="pageMain__bookLi" key={i}>
                              <BookHalf reviewsList={[ bid ]} bookId={bid.bookId}/>
                            </li>
                          ))
                        }
                      </ul>
                    </section>
                  </div>
                )
              }
            }
          </Query>



          {/*
          <ul>
            <Query query={getRandomReaders} variables={{numToGet: 4}}>
              {
                ({loading, error, data}) => {
                  if (loading){
                    return 'loading'
                  }
                  const randSuggestion = data.getRandomReaders;
                  console.log(randSuggestion);
                  return randSuggestion.map((item, i) => (
                    <li key={i}>
                      <PersonMini personObj={item}/>
                    </li>
                  ))
                }
              }
            </Query>
          </ul>
          */}

      </Fragment>
    )
  }
}
