import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Footer extends Component {
  render() {
    return (
      <div className="bottom-fixed">
        <div className="footer">
          <div className="container-flexible container-flexible--padding-xl">
            <div className="row">
              <div className="col-sm-8">
                <span className="footer__copyrights">RoyaleCase 2018, All Rights Reserved.</span>
                <div className="footer__links">
                  <Link to="/terms">Terms of Service</Link>
                  <Link to="/faq">F.A.Q</Link>
                </div>
              </div>
              <div className="col-sm-4" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
