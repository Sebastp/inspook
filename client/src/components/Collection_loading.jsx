import React, { Component } from 'react'


import BookList from './hocs/BookList'




export default class Collection_loading extends Component {
  render() {
    return (
      <div className="collectionPage loading">
        <header className="cont-width_0 pagebcpTop">
          <div className="row">
            <div className="col-0 col-lg-1"/>
            <div className="collection-info bcp-info col">

              <div className="collection-info__total">
                <span className="subAnach bcp-pname">Collection</span>
                <h1 className="collection-title bcp-title">Loading Title</h1>
                <p className="collection-desc bcp-desc">Loading Description</p>
              </div>

              <div className="collection-specs bcp-spec">
              </div>
            </div>
            <div className="col-0 col-lg-1"/>
          </div>

          <div className="collection-canvas bcp-canvas">
            <div className="collection-cover bcp-canvas__cover gradient-loadAnim"/>
            <div className="collection-bck bcp-canvas__bck"
              style={{ backgroundColor: '#eee' }}
            />
          </div>

        </header>



        <section className="pagebcpMain cont-width_0">
          <div className="row rowCont">
            <div className="col-0 col-lg-1"/>

            <div className="col col-md-8 col-lg-6 centColumn">
              <ul>
                  <BookList
                    loading={true}
                  />
              </ul>
            </div>
            <div className="col-0 col-lg-1"/>
          </div>
        </section>
      </div>
    )
  }
}
