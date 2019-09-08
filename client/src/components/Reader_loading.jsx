import React, {Component} from 'react'

import BookList from './hocs/BookList'


export default class Reader_loading extends Component {
  render() {

    return (
      <div className="readerPage loading">
        <header className="cont-width_2 pagebcpTop readerPage-top">
          <div className="readerPage-cover gradient-loadAnim"/>

          <div className="readerPage-info bcp-info">
            <span className="readerPage-tags bcp-pname subAnach">Person</span>
            <h1 className="readerPage-name bcp-title">Loading Name</h1>
            <p className="readerPage-desc bcp-desc">Loading Description</p>
          </div>

          <div className="readerPage-divline"/>
        </header>


        <section className="pagebcpMain">
          <ul className="cont-width_2">
            <BookList loading={true}/>
          </ul>
        </section>
      </div>
    )
  }
}
