import React, {Component, Fragment} from 'react'
import {Query} from 'react-apollo'

import {Link} from 'react-router-dom'



import Topbar from './Topbar'
import Footer from './Footer'
import PersonMini from './PersonMini'
import BookHalf from './BookHalf'
import BookList from './hocs/BookList'


import { getReaderPage, getRandomReaders } from '../graphql'


export default class Reader extends Component {
  state = {
    currPage: 1
  }
  PAGE_SIZE = 20

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
                    reader_tag = readerObj.tag,
                    reader_books = readerObj.books,
                    reader_avatarName = readerObj.avatar ? readerObj.avatar : readerObj.uid,
                    reader_avatar = require('../assets/img/readers/'+ reader_avatarName +'.jpg')

                reader_books.map(e => {
                  e.uid = reader_uid
                  e.displayName = reader_name
                  e.clampLine = 0
                  return e;
                })



                return (
                  <div className="readerPage">
                    <header className="cont-width_2 pagebcpTop readerPage-top">
                      <div className="readerPage-cover"
                        style={{
                          backgroundImage: `url(${reader_avatar})`
                        }}
                      />

                      <div className="readerPage-info bcp-info">
                        <span className="readerPage-tags bcp-pname subAnach">{reader_tag}</span>
                        <h1 className="readerPage-name bcp-title">{reader_name}</h1>
                        <p className="readerPage-desc bcp-desc">{reader_desc}</p>
                        <div className="bcp-spec">
                          <p>Books  {reader_books.length}</p>
                        </div>
                      </div>

                      <div className="readerPage-divline"/>
                    </header>


                    <section className="pagebcpMain">
                      <ul className="cont-width_2">
                        <BookList
                          lItems={reader_books.slice(0, this.PAGE_SIZE*this.state.currPage)}
                          onLoadMore={() =>{
                              if (this.PAGE_SIZE*this.state.currPage < reader_books.length) {
                                this.setState({ currPage: this.state.currPage+1 });
                              }
                            }
                          }
                        />
                      </ul>
                    </section>
                  </div>
                )
              }
            }
          </Query>





          <Footer/>
      </Fragment>
    )
  }
}
