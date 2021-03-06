import React, { Component, Fragment } from 'react';

import BookHalf from './../BookHalf'
import BookHalf_loading from './../BookHalf_loading';



export default class BookList extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.handleOnScroll);

  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  handleOnScroll = () => {
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    var scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    var clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight-500;


    if (scrolledToBottom && !this.props.loading) {
      this.props.onLoadMore();
    }
  };

  render() {
    if (!this.props.lItems && this.props.loading){
      return(
        <Fragment>
          {
            [0,1,2,3].map(( item, i ) => (
              <BookHalf_loading/>
            ))
          }
        </Fragment>
      )
    }

    const { lItems } = this.props

    return(
      <Fragment>
        {lItems.map(( item, i ) => (
          <li className="pageMain__bookLi" key={i}>
            <BookHalf onShelvesProp={item.onShelves} reviewsList={[ item ]} bookId={item.bookId}/>
            <hr/>
          </li>
        ))}
      </Fragment>
    )
  }
}
