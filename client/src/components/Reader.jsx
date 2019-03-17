import React, {Component, Fragment} from 'react'
import {Query} from 'react-apollo'

import {Link} from 'react-router-dom'



import Topbar from './Topbar'
import Footer from './Footer'
import PersonMini from './PersonMini'
import BookHalf from './BookHalf'

import { getReaderPage, getRandomReaders } from '../graphql'

export default class Reader extends Component {
  render() {
    const urlUid = this.props.match.params.urlUid

    return (<Fragment>
      <Query query={getReaderPage} variables={{uid: urlUid}}>
        {
          ({loading, error, data}) => {
            if (loading){
              return 'loading'
            }

            if (error) {
              return error.toString()
            }
            var reader = data.getByUid;
            if (reader.avatar) {
              this.ravatar = reader.avatar
            }else {
              this.ravatar = reader.uid
            }



            return (
              <Fragment>
              <header className="reader-top">
                <Topbar/>
                <section className="top-inner">
                  <div className="top-person">
                    <Link to='/reader/' className="top-person-cover">
                      <div className="person-cover__inner" style={{
                          backgroundImage: `url(${require('../assets/img/readers/'+this.ravatar+'.jpg')})`
                        }}/>
                    </Link>

                    <span className="top-person-name">
                      <Link to='/reader/'>
                        {reader.displayName}
                      </Link>
                    </span>
                    <span className="top-person-subtitle">{reader.desc}</span>
                  </div>

                  <div className="sugestions">
                    <div className="heading">
                      <hr/>
                      <span>You Should also see</span>
                      <hr/>
                    </div>

                    <ul>
                      <Query query={getRandomReaders} variables={{numToGet: 4}}>
                        {
                          ({loading, error, data}) => {
                            if (loading){
                              return 'loading'
                            }
                            const randSuggestion = data.getRandomReaders;
                            console.log(randSuggestion);
                            return randSuggestion.map((item, i) => (<li key={i}>
                              <PersonMini personObj={item}/>
                            </li>))
                          }
                        }
                      </Query>
                    </ul>
                  </div>
                </section>

              </header>

              <div className="reader-books">
                <ul className="row">
                  {reader.books.map((item, i) => (<BookHalf key={i} bookinfo={item}/>))}
                </ul>
              </div>
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
